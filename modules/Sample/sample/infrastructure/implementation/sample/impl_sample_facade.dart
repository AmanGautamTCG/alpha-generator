import '../../../domain/sample/i_sample_facade.dart';
import '../../../domain/sample/sample.dart';
import '../../../domain/sample/sample_failure.dart';
import '../../core/imports/infrastructure.essentials.barrel.dart';
import '../../datasources/local/sources/sample_local_datasource.dart';
import '../../datasources/remote/sample/sample_remote_datasource.dart';

@prod
@Injectable(
    as: ISampleFacade, env: [Environment.dev, Environment.test, Environment.prod])
class SampleFacadeImpl implements ISampleFacade {

  Logger get logger => getIt<Logger>();
  SampleRemoteDataSource get sampleRemoteDataSource => getIt<SampleRemoteDataSource>();
  SampleLocalDataSource get sampleLocalDataSource => getIt<SampleLocalDataSource>();

  @override
  Future<Either<SampleFailure, Sample>> getByID({required String id}) async {
    try {
      final data = await sampleLocalDataSource.getByID(id: id);
      if(data == null) {
        final remoteData = await sampleRemoteDataSource.getByID(id: id);
        return await remoteData.fold(
              (failure) async => left(const SampleFailure.error()),
              (success) async {
            if (success.data != null) {
              await sampleLocalDataSource.add(data: success.data!);
              return right(success.data!);
            } else {
              return left(const SampleFailure.error());
            }
          },
        );
      } else {
        return right(data);
      }
    } on Exception catch (_) {
      logger.e('Exception Occurred in Sample Facade >>> $_');
      return left(const SampleFailure.unexpected());
    }
  }

}
