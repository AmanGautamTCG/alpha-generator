import '../../../../domain/sample/sample.dart';
import '../../../core/imports/infrastructure.essentials.barrel.dart';
import '../../../core/remote.essentials.barrel.dart';

abstract class SampleRemoteDataSource {
  Future<Either<RemoteFailures, RemoteResponse<Sample>>> getByID({required String id});
}

@prod
@Injectable(
    as: SampleRemoteDataSource,
    env: [Environment.dev, Environment.test, Environment.prod])
class SampleRemoteDataSourceImpl implements SampleRemoteDataSource {
  Logger get logger => getIt<Logger>();

  @override
  Future<Either<RemoteFailures, RemoteResponse<Sample>>> getByID({required String id}) async {
    try {
      final resultOrFailure = await RemoteRequestClient.fetch(
        url: Constants.sampleEndpoint,
        remoteRequest: RemoteRequest(id: id),
      );
      return resultOrFailure.fold(
        left,
            (response) async =>
            right(RemoteResponse<Sample>.fromResponse(response).copyWith(
              data: Sample.fromJson(response.decoded as Map<String, dynamic>),
            )),
      );
    } on Exception catch (_) {
      return left(const RemoteFailures.unexpected());
    }
  }

}
