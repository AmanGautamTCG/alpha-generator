import '../../../../domain/user/user.dart';
import '../../../core/imports/infrastructure.essentials.barrel.dart';
import '../../../core/remote.essentials.barrel.dart';

abstract class UserRemoteDataSource {
  Future<Either<RemoteFailures, RemoteResponse<User>>> getByID({required String id});
}

@prod
@Injectable(
    as: UserRemoteDataSource,
    env: [Environment.dev, Environment.test, Environment.prod])
class UserRemoteDataSourceImpl implements UserRemoteDataSource {
  Logger get logger => getIt<Logger>();

  @override
  Future<Either<RemoteFailures, RemoteResponse<User>>> getByID({required String id}) async {
    try {
      final resultOrFailure = await RemoteRequestClient.fetch(
        url: Constants.sampleEndpoint,
        remoteRequest: RemoteRequest(id: id),
      );
      return resultOrFailure.fold(
        left,
            (response) async =>
            right(RemoteResponse<User>.fromResponse(response).copyWith(
              data: User.fromJson(response.decoded as Map<String, dynamic>),
            )),
      );
    } on Exception catch (_) {
      return left(const RemoteFailures.unexpected());
    }
  }

}
