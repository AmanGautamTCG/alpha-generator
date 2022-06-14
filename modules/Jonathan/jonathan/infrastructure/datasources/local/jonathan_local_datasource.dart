import 'package:hive/hive.dart';
import 'package:injectable/injectable.dart';

import '../../../../core/injection/injection.dart';
import '../../../../domain/jonathan/jonathan.dart';

abstract class JonathanLocalDataSource {
  Future<Jonathan?> getByID({required String id});
  Future<List<Jonathan>?> getAll();
  Future<Jonathan?> add({required Jonathan data});
  Future<void> clear();
}

@prod
@Injectable(
    as: JonathanLocalDataSource,
    env: [Environment.dev, Environment.test, Environment.prod])
class JonathanLocalDataSourceImpl implements JonathanLocalDataSource {
  final jonathanBoxOpen =
      getIt<HiveInterface>().box<JonathanBox>('jonathanBox');

  @override
  Future<List<Jonathan>?> getAll() async {
    try {
      final isJonathanBoxOpenEmpty = jonathanBoxOpen.isEmpty;
      if (isJonathanBoxOpenEmpty) {
        return null;
      } else {
        return Future.value(jonathanBoxOpen.values
            .map((e) => Jonathan.fromBox(box: e))
            .toList());
      }
    } on Exception catch (_) {
      return null;
    }
  }

  @override
  Future<Jonathan?> getByID({required String id}) async {
    try {
      final isJonathanBoxOpenEmpty = jonathanBoxOpen.isEmpty;
      if (isJonathanBoxOpenEmpty) {
        return null;
      } else {
        final data = jonathanBoxOpen.get(id);
        return Future.value(Jonathan.fromBox(box: data!));
      }
    } on Exception catch (_) {
      return null;
    }
  }

  @override
  Future<Jonathan?> add({required Jonathan data}) async {
    try {
      await jonathanBoxOpen.put(
          data.id, JonathanBox.fromDomain(domain: data));
      final saved = jonathanBoxOpen.get(data.id);
      return Jonathan.fromBox(box: saved!);
    } on Exception catch (_) {
      return null;
    }
  }

  @override
  Future<void> clear() async {
    try {
      await jonathanBoxOpen.clear();
    } on Exception catch (_) {
    }
  }
}
