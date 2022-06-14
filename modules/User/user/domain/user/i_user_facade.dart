import 'package:dartz/dartz.dart';

import 'user.dart';
import 'user_failure.dart';

abstract class IUserFacade {
  Future<Either<UserFailure, User>> getByID({required String id});
}
