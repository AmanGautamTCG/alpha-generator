import 'package:freezed_annotation/freezed_annotation.dart';

part 'jonathan_failure.freezed.dart';

@freezed
class JonathanFailure with _$JonathanFailure {
	const factory JonathanFailure.error() = Error;
	const factory JonathanFailure.notFound() = NotFound;
	const factory JonathanFailure.unexpected() = Unexpected;
}
