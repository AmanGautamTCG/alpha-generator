import '../../../../domain/aman/aman.dart';
import '../../../core/imports/infrastructure.essentials.barrel.dart';
import '../../../core/remote.essentials.barrel.dart';

abstract class AmanRemoteDataSource {
  Future<Either<RemoteFailures, RemoteResponse<Aman>>> getByID({required String id});
}

@prod
@Injectable(
    as: AmanRemoteDataSource,
    env: [Environment.dev, Environment.test, Environment.prod])
class AmanRemoteDataSourceImpl implements AmanRemoteDataSource {
  Logger get logger => getIt<Logger>();

  @override
  Future<Either<RemoteFailures, RemoteResponse<Aman>>> getByID({required String id}) async {
    try {
      final resultOrFailure = await RemoteRequestClient.fetch(
        url: Constants.sampleEndpoint,
        remoteRequest: RemoteRequest(id: id),
      );
      return resultOrFailure.fold(
        left,
            (response) async =>
            right(RemoteResponse<Aman>.fromResponse(response).copyWith(
              data: Aman.fromJson(response.decoded as Map<String, dynamic>),
            )),
      );
    } on Exception catch (_) {
      return left(const RemoteFailures.unexpected());
    }
  }

}
