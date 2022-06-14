import 'package:dartz/dartz.dart';

import 'sample.dart';
import 'sample_failure.dart';

abstract class ISampleFacade {
  Future<Either<SampleFailure, Sample>> getByID({required String id});
}
