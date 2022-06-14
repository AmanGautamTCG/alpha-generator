import 'package:freezed_annotation/freezed_annotation.dart';

part 'user_failure.freezed.dart';

@freezed
class UserFailure with _$UserFailure {
	const factory UserFailure.error() = Error;
	const factory UserFailure.notFound() = NotFound;
	const factory UserFailure.unexpected() = Unexpected;
}
