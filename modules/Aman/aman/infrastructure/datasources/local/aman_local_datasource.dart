import 'package:hive/hive.dart';
import 'package:injectable/injectable.dart';

import '../../../../core/injection/injection.dart';
import '../../../../domain/aman/aman.dart';

abstract class AmanLocalDataSource {
  Future<Aman?> getByID({required String id});
  Future<List<Aman>?> getAll();
  Future<Aman?> add({required Aman data});
  Future<void> clear();
}

@prod
@Injectable(
    as: AmanLocalDataSource,
    env: [Environment.dev, Environment.test, Environment.prod])
class AmanLocalDataSourceImpl implements AmanLocalDataSource {
  final amanBoxOpen =
      getIt<HiveInterface>().box<AmanBox>('amanBox');

  @override
  Future<List<Aman>?> getAll() async {
    try {
      final isAmanBoxOpenEmpty = amanBoxOpen.isEmpty;
      if (isAmanBoxOpenEmpty) {
        return null;
      } else {
        return Future.value(amanBoxOpen.values
            .map((e) => Aman.fromBox(box: e))
            .toList());
      }
    } on Exception catch (_) {
      return null;
    }
  }

  @override
  Future<Aman?> getByID({required String id}) async {
    try {
      final isAmanBoxOpenEmpty = amanBoxOpen.isEmpty;
      if (isAmanBoxOpenEmpty) {
        return null;
      } else {
        final data = amanBoxOpen.get(id);
        return Future.value(Aman.fromBox(box: data!));
      }
    } on Exception catch (_) {
      return null;
    }
  }

  @override
  Future<Aman?> add({required Aman data}) async {
    try {
      await amanBoxOpen.put(
          data.id, AmanBox.fromDomain(domain: data));
      final saved = amanBoxOpen.get(data.id);
      return Aman.fromBox(box: saved!);
    } on Exception catch (_) {
      return null;
    }
  }

  @override
  Future<void> clear() async {
    try {
      await amanBoxOpen.clear();
    } on Exception catch (_) {
    }
  }
}
