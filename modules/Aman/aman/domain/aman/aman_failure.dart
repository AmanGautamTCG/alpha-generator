import 'package:freezed_annotation/freezed_annotation.dart';

part 'aman_failure.freezed.dart';

@freezed
class AmanFailure with _$AmanFailure {
	const factory AmanFailure.error() = Error;
	const factory AmanFailure.notFound() = NotFound;
	const factory AmanFailure.unexpected() = Unexpected;
}
