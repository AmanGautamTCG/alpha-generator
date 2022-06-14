import '../../../domain/jonathan/i_jonathan_facade.dart';
import '../../../domain/jonathan/jonathan.dart';
import '../../../domain/jonathan/jonathan_failure.dart';
import '../../core/imports/infrastructure.essentials.barrel.dart';
import '../../datasources/local/sources/jonathan_local_datasource.dart';
import '../../datasources/remote/jonathan/jonathan_remote_datasource.dart';

@prod
@Injectable(
    as: IJonathanFacade, env: [Environment.dev, Environment.test, Environment.prod])
class JonathanFacadeImpl implements IJonathanFacade {

  Logger get logger => getIt<Logger>();
  JonathanRemoteDataSource get jonathanRemoteDataSource => getIt<JonathanRemoteDataSource>();
  JonathanLocalDataSource get jonathanLocalDataSource => getIt<JonathanLocalDataSource>();

  @override
  Future<Either<JonathanFailure, Jonathan>> getByID({required String id}) async {
    try {
      final data = await jonathanLocalDataSource.getByID(id: id);
      if(data == null) {
        final remoteData = await jonathanRemoteDataSource.getByID(id: id);
        return await remoteData.fold(
              (failure) async => left(const JonathanFailure.error()),
              (success) async {
            if (success.data != null) {
              await jonathanLocalDataSource.add(data: success.data!);
              return right(success.data!);
            } else {
              return left(const JonathanFailure.error());
            }
          },
        );
      } else {
        return right(data);
      }
    } on Exception catch (_) {
      logger.e('Exception Occurred in Jonathan Facade >>> $_');
      return left(const JonathanFailure.unexpected());
    }
  }

}
