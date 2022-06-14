import 'package:freezed_annotation/freezed_annotation.dart';

part 'sample_failure.freezed.dart';

@freezed
class SampleFailure with _$SampleFailure {
	const factory SampleFailure.error() = Error;
	const factory SampleFailure.notFound() = NotFound;
	const factory SampleFailure.unexpected() = Unexpected;
}
