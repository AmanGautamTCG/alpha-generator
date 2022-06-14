import '../../../domain/user/i_user_facade.dart';
import '../../../domain/user/user.dart';
import '../../../domain/user/user_failure.dart';
import '../../core/imports/infrastructure.essentials.barrel.dart';
import '../../datasources/local/sources/user_local_datasource.dart';
import '../../datasources/remote/user/user_remote_datasource.dart';

@prod
@Injectable(
    as: IUserFacade, env: [Environment.dev, Environment.test, Environment.prod])
class UserFacadeImpl implements IUserFacade {

  Logger get logger => getIt<Logger>();
  UserRemoteDataSource get userRemoteDataSource => getIt<UserRemoteDataSource>();
  UserLocalDataSource get userLocalDataSource => getIt<UserLocalDataSource>();

  @override
  Future<Either<UserFailure, User>> getByID({required String id}) async {
    try {
      final data = await userLocalDataSource.getByID(id: id);
      if(data == null) {
        final remoteData = await userRemoteDataSource.getByID(id: id);
        return await remoteData.fold(
              (failure) async => left(const UserFailure.error()),
              (success) async {
            if (success.data != null) {
              await userLocalDataSource.add(data: success.data!);
              return right(success.data!);
            } else {
              return left(const UserFailure.error());
            }
          },
        );
      } else {
        return right(data);
      }
    } on Exception catch (_) {
      logger.e('Exception Occurred in User Facade >>> $_');
      return left(const UserFailure.unexpected());
    }
  }

}
