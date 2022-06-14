import 'package:hive/hive.dart';
import 'package:injectable/injectable.dart';

import '../../../../core/injection/injection.dart';
import '../../../../domain/user/user.dart';

abstract class UserLocalDataSource {
  Future<User?> getByID({required String id});
  Future<List<User>?> getAll();
  Future<User?> add({required User data});
  Future<void> clear();
}

@prod
@Injectable(
    as: UserLocalDataSource,
    env: [Environment.dev, Environment.test, Environment.prod])
class UserLocalDataSourceImpl implements UserLocalDataSource {
  final userBoxOpen =
      getIt<HiveInterface>().box<UserBox>('userBox');

  @override
  Future<List<User>?> getAll() async {
    try {
      final isUserBoxOpenEmpty = userBoxOpen.isEmpty;
      if (isUserBoxOpenEmpty) {
        return null;
      } else {
        return Future.value(userBoxOpen.values
            .map((e) => User.fromBox(box: e))
            .toList());
      }
    } on Exception catch (_) {
      return null;
    }
  }

  @override
  Future<User?> getByID({required String id}) async {
    try {
      final isUserBoxOpenEmpty = userBoxOpen.isEmpty;
      if (isUserBoxOpenEmpty) {
        return null;
      } else {
        final data = userBoxOpen.get(id);
        return Future.value(User.fromBox(box: data!));
      }
    } on Exception catch (_) {
      return null;
    }
  }

  @override
  Future<User?> add({required User data}) async {
    try {
      await userBoxOpen.put(
          data.id, UserBox.fromDomain(domain: data));
      final saved = userBoxOpen.get(data.id);
      return User.fromBox(box: saved!);
    } on Exception catch (_) {
      return null;
    }
  }

  @override
  Future<void> clear() async {
    try {
      await userBoxOpen.clear();
    } on Exception catch (_) {
    }
  }
}
