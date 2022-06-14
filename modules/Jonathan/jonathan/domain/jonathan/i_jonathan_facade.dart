import 'package:dartz/dartz.dart';

import 'jonathan.dart';
import 'jonathan_failure.dart';

abstract class IJonathanFacade {
  Future<Either<JonathanFailure, Jonathan>> getByID({required String id});
}
