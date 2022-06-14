import '../../../domain/aman/i_aman_facade.dart';
import '../../../domain/aman/aman.dart';
import '../../../domain/aman/aman_failure.dart';
import '../../core/imports/infrastructure.essentials.barrel.dart';
import '../../datasources/local/sources/aman_local_datasource.dart';
import '../../datasources/remote/aman/aman_remote_datasource.dart';

@prod
@Injectable(
    as: IAmanFacade, env: [Environment.dev, Environment.test, Environment.prod])
class AmanFacadeImpl implements IAmanFacade {

  Logger get logger => getIt<Logger>();
  AmanRemoteDataSource get amanRemoteDataSource => getIt<AmanRemoteDataSource>();
  AmanLocalDataSource get amanLocalDataSource => getIt<AmanLocalDataSource>();

  @override
  Future<Either<AmanFailure, Aman>> getByID({required String id}) async {
    try {
      final data = await amanLocalDataSource.getByID(id: id);
      if(data == null) {
        final remoteData = await amanRemoteDataSource.getByID(id: id);
        return await remoteData.fold(
              (failure) async => left(const AmanFailure.error()),
              (success) async {
            if (success.data != null) {
              await amanLocalDataSource.add(data: success.data!);
              return right(success.data!);
            } else {
              return left(const AmanFailure.error());
            }
          },
        );
      } else {
        return right(data);
      }
    } on Exception catch (_) {
      logger.e('Exception Occurred in Aman Facade >>> $_');
      return left(const AmanFailure.unexpected());
    }
  }

}
