export const blocStringTemplate: string = `import '../../domain/\${moduleSnake}/i_\${moduleSnake}_facade.dart';
import '../core/essentials.barrel.dart';

part '\${moduleSnake}_bloc.freezed.dart';
part '\${moduleSnake}_event.dart';
part '\${moduleSnake}_state.dart';

I\${module}Facade get i\${module}Facade => getIt<I\${module}Facade>();
Logger get logger => getIt<Logger>();

@lazySingleton
class \${module}Bloc extends Bloc<\${module}Event, \${module}State>
    with BlocLogging<\${module}Bloc, \${module}Event, \${module}State> {
  \${module}Bloc() : super(const \${module}State.initial()) {
    on<Initiate>(_onInitiate);
  }

  Future<void> _onInitiate(\${module}Event event, Emitter<\${module}State> emit) async {

  }

}
`;

export const blocEventStringTemplate: string = `part of '\${moduleSnake}_bloc.dart';

@freezed
class \${module}Event with _$\${module}Event {
  const factory \${module}Event.initiate() = Initiate;
  const factory \${module}Event.refresh() = Refresh;
}`;

export const blocStateStringTemplate: string = `part of '\${moduleSnake}_bloc.dart';

@freezed
class \${module}State with _$\${module}State {
  const factory \${module}State.initial() = Initial;
  const factory \${module}State.loading() = Loading;
  const factory \${module}State.error() = Error;
  const factory \${module}State.loaded({required String message}) = Loaded;
}`;

export const domainModelStringTemplate: string = `import 'dart:convert';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:hive/hive.dart';

part '\${moduleSnake}.freezed.dart';
part '\${moduleSnake}.g.dart';

@freezed
class \${module} with _$\${module} {
  @JsonSerializable(includeIfNull: false)
  const factory \${module}({
    @JsonKey(name: '_id') String? id,
    String? uid,
    String? self,
    String? actID,
    String? name,
    String? mediaID,
    String? caption,
    int? views,
    bool? isActive,
    bool? isDeleted,
    String? description,
    DateTime? createdOn,
    DateTime? updatedOn,
  }) = _\${module};

  factory \${module}.fromJson(Map<String, dynamic> json) =>
      _$\${module}FromJson(json);
  
  factory \${module}.fromBox({required \${module}Box box}) =>
      \${module}.fromJson(json.decode(box.data as String) as Map<String, dynamic>);    
}

@HiveType(typeId: 5, adapterName: '\${module}BoxAdapter')
class \${module}Box {
  \${module}Box({this.self, this.data});

  factory \${module}Box.fromDomain({
    required \${module} domain,
  }) =>
      \${module}Box(self: domain!.self, data: json.encode(domain));

  @HiveField(0)
  String? self;
  @HiveField(1)
  String? data;
}

`;

export const domainFailureStringTemplate: string = `import 'package:freezed_annotation/freezed_annotation.dart';

part '\${moduleSnake}_failure.freezed.dart';

@freezed
class \${module}Failure with _$\${module}Failure {
\tconst factory \${module}Failure.error() = Error;
\tconst factory \${module}Failure.notFound() = NotFound;
\tconst factory \${module}Failure.unexpected() = Unexpected;
}
`;

export const domainFacadeStringTemplate: string = `import 'package:dartz/dartz.dart';

import '\${moduleSnake}.dart';
import '\${moduleSnake}_failure.dart';

abstract class I\${module}Facade {
  Future<Either<\${module}Failure, \${module}>> getByID({required String id});
}
`;

export const localSourceStringTemplate: string = `import 'package:hive/hive.dart';
import 'package:injectable/injectable.dart';

import '../../../../core/injection/injection.dart';
import '../../../../domain/\${moduleSnake}/\${moduleSnake}.dart';

abstract class \${module}LocalDataSource {
  Future<\${module}?> getByID({required String id});
  Future<List<\${module}>?> getAll();
  Future<\${module}?> add({required \${module} data});
  Future<void> clear();
}

@prod
@Injectable(
    as: \${module}LocalDataSource,
    env: [Environment.dev, Environment.test, Environment.prod])
class \${module}LocalDataSourceImpl implements \${module}LocalDataSource {
  final \${moduleCamel}BoxOpen =
      getIt<HiveInterface>().box<\${module}Box>('\${moduleCamel}Box');

  @override
  Future<List<\${module}>?> getAll() async {
    try {
      final is\${module}BoxOpenEmpty = \${moduleCamel}BoxOpen.isEmpty;
      if (is\${module}BoxOpenEmpty) {
        return null;
      } else {
        return Future.value(\${moduleCamel}BoxOpen.values
            .map((e) => \${module}.fromBox(box: e))
            .toList());
      }
    } on Exception catch (_) {
      return null;
    }
  }

  @override
  Future<\${module}?> getByID({required String id}) async {
    try {
      final is\${module}BoxOpenEmpty = \${moduleCamel}BoxOpen.isEmpty;
      if (is\${module}BoxOpenEmpty) {
        return null;
      } else {
        final data = \${moduleCamel}BoxOpen.get(id);
        return Future.value(\${module}.fromBox(box: data!));
      }
    } on Exception catch (_) {
      return null;
    }
  }

  @override
  Future<\${module}?> add({required \${module} data}) async {
    try {
      await \${moduleCamel}BoxOpen.put(
          data.id, \${module}Box.fromDomain(domain: data));
      final saved = \${moduleCamel}BoxOpen.get(data.id);
      return \${module}.fromBox(box: saved!);
    } on Exception catch (_) {
      return null;
    }
  }

  @override
  Future<void> clear() async {
    try {
      await \${moduleCamel}BoxOpen.clear();
    } on Exception catch (_) {
    }
  }
}
`;

export const remoteSourceStringTemplate: string = `import '../../../../domain/\${moduleSnake}/\${moduleSnake}.dart';
import '../../../core/imports/infrastructure.essentials.barrel.dart';
import '../../../core/remote.essentials.barrel.dart';

abstract class \${module}RemoteDataSource {
  Future<Either<RemoteFailures, RemoteResponse<\${module}>>> getByID({required String id});
}

@prod
@Injectable(
    as: \${module}RemoteDataSource,
    env: [Environment.dev, Environment.test, Environment.prod])
class \${module}RemoteDataSourceImpl implements \${module}RemoteDataSource {
  Logger get logger => getIt<Logger>();

  @override
  Future<Either<RemoteFailures, RemoteResponse<\${module}>>> getByID({required String id}) async {
    try {
      final resultOrFailure = await RemoteRequestClient.fetch(
        url: Constants.sampleEndpoint,
        remoteRequest: RemoteRequest(id: id),
      );
      return resultOrFailure.fold(
        left,
            (response) async =>
            right(RemoteResponse<\${module}>.fromResponse(response).copyWith(
              data: \${module}.fromJson(response.decoded as Map<String, dynamic>),
            )),
      );
    } on Exception catch (_) {
      return left(const RemoteFailures.unexpected());
    }
  }

}
`;

export const implementationStringTemplate: string = `import '../../../domain/\${moduleSnake}/i_\${moduleSnake}_facade.dart';
import '../../../domain/\${moduleSnake}/\${moduleSnake}.dart';
import '../../../domain/\${moduleSnake}/\${moduleSnake}_failure.dart';
import '../../core/imports/infrastructure.essentials.barrel.dart';
import '../../datasources/local/sources/\${moduleSnake}_local_datasource.dart';
import '../../datasources/remote/\${moduleSnake}/\${moduleSnake}_remote_datasource.dart';

@prod
@Injectable(
    as: I\${module}Facade, env: [Environment.dev, Environment.test, Environment.prod])
class \${module}FacadeImpl implements I\${module}Facade {

  Logger get logger => getIt<Logger>();
  \${module}RemoteDataSource get \${moduleCamel}RemoteDataSource => getIt<\${module}RemoteDataSource>();
  \${module}LocalDataSource get \${moduleCamel}LocalDataSource => getIt<\${module}LocalDataSource>();

  @override
  Future<Either<\${module}Failure, \${module}>> getByID({required String id}) async {
    try {
      final data = await \${moduleCamel}LocalDataSource.getByID(id: id);
      if(data == null) {
        final remoteData = await \${moduleCamel}RemoteDataSource.getByID(id: id);
        return await remoteData.fold(
              (failure) async => left(const \${module}Failure.error()),
              (success) async {
            if (success.data != null) {
              await \${moduleCamel}LocalDataSource.add(data: success.data!);
              return right(success.data!);
            } else {
              return left(const \${module}Failure.error());
            }
          },
        );
      } else {
        return right(data);
      }
    } on Exception catch (_) {
      logger.e('Exception Occurred in \${module} Facade >>> $_');
      return left(const \${module}Failure.unexpected());
    }
  }

}
`;

export const pageStringTemplate: string = `import '../../core/imports/presentation.essentials.barrel.dart';
import 'widgets/widget_\${moduleSnake}_main.dart';

class \${module}Page extends StatefulWidget {
  const \${module}Page({Key? key}) : super(key: key);

 @override
  Widget build(BuildContext context) => const SafeArea(
        child: Scaffold(
          body: \${module}MainWidget(),
        ),
      );
}
`;

export const pageWidgetStringTemplate: string = `import '../../../../application/\${moduleSnake}/\${moduleSnake}_bloc.dart';
import '../../../core/imports/presentation.essentials.barrel.dart';

class \${module}MainWidget extends StatefulWidget {
  const \${module}MainWidget({Key? key}) : super(key: key);

  @override
  _\${module}MainWidgetState createState() => _\${module}MainWidgetState();
}

class _\${module}MainWidgetState extends State<\${module}MainWidget> {
  @override
  Widget build(BuildContext context) => Container(
        margin: const EdgeInsets.symmetric(horizontal: 12),
        child: BlocConsumer<\${module}Bloc, \${module}State>(
          listener: (context, state) {},
          builder: (context, state) => state.maybeMap(
 orElse: () => const SizedBox.shrink(),
            loaded: (s) => SingleChildScrollView(
              child: Column(children: [
                Text('Hy'),
              ]),
            ),
           
          ),
        ),
      );
}
`;
