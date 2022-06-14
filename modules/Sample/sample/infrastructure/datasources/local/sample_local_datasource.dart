import 'package:hive/hive.dart';
import 'package:injectable/injectable.dart';

import '../../../../core/injection/injection.dart';
import '../../../../domain/sample/sample.dart';

abstract class SampleLocalDataSource {
  Future<Sample?> getByID({required String id});
  Future<List<Sample>?> getAll();
  Future<Sample?> add({required Sample data});
  Future<void> clear();
}

@prod
@Injectable(
    as: SampleLocalDataSource,
    env: [Environment.dev, Environment.test, Environment.prod])
class SampleLocalDataSourceImpl implements SampleLocalDataSource {
  final sampleBoxOpen =
      getIt<HiveInterface>().box<SampleBox>('sampleBox');

  @override
  Future<List<Sample>?> getAll() async {
    try {
      final isSampleBoxOpenEmpty = sampleBoxOpen.isEmpty;
      if (isSampleBoxOpenEmpty) {
        return null;
      } else {
        return Future.value(sampleBoxOpen.values
            .map((e) => Sample.fromBox(box: e))
            .toList());
      }
    } on Exception catch (_) {
      return null;
    }
  }

  @override
  Future<Sample?> getByID({required String id}) async {
    try {
      final isSampleBoxOpenEmpty = sampleBoxOpen.isEmpty;
      if (isSampleBoxOpenEmpty) {
        return null;
      } else {
        final data = sampleBoxOpen.get(id);
        return Future.value(Sample.fromBox(box: data!));
      }
    } on Exception catch (_) {
      return null;
    }
  }

  @override
  Future<Sample?> add({required Sample data}) async {
    try {
      await sampleBoxOpen.put(
          data.id, SampleBox.fromDomain(domain: data));
      final saved = sampleBoxOpen.get(data.id);
      return Sample.fromBox(box: saved!);
    } on Exception catch (_) {
      return null;
    }
  }

  @override
  Future<void> clear() async {
    try {
      await sampleBoxOpen.clear();
    } on Exception catch (_) {
    }
  }
}
