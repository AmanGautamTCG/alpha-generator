import '../../../../domain/jonathan/jonathan.dart';
import '../../../core/imports/infrastructure.essentials.barrel.dart';
import '../../../core/remote.essentials.barrel.dart';

abstract class JonathanRemoteDataSource {
  Future<Either<RemoteFailures, RemoteResponse<Jonathan>>> getByID({required String id});
}

@prod
@Injectable(
    as: JonathanRemoteDataSource,
    env: [Environment.dev, Environment.test, Environment.prod])
class JonathanRemoteDataSourceImpl implements JonathanRemoteDataSource {
  Logger get logger => getIt<Logger>();

  @override
  Future<Either<RemoteFailures, RemoteResponse<Jonathan>>> getByID({required String id}) async {
    try {
      final resultOrFailure = await RemoteRequestClient.fetch(
        url: Constants.sampleEndpoint,
        remoteRequest: RemoteRequest(id: id),
      );
      return resultOrFailure.fold(
        left,
            (response) async =>
            right(RemoteResponse<Jonathan>.fromResponse(response).copyWith(
              data: Jonathan.fromJson(response.decoded as Map<String, dynamic>),
            )),
      );
    } on Exception catch (_) {
      return left(const RemoteFailures.unexpected());
    }
  }

}
