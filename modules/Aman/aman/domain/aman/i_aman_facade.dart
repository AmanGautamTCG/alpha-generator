import 'package:dartz/dartz.dart';

import 'aman.dart';
import 'aman_failure.dart';

abstract class IAmanFacade {
  Future<Either<AmanFailure, Aman>> getByID({required String id});
}
