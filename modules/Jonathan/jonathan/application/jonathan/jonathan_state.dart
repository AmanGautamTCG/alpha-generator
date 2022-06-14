part of 'jonathan_bloc.dart';

@freezed
class JonathanState with _$JonathanState {
  const factory JonathanState.initial() = Initial;
  const factory JonathanState.loading() = Loading;
  const factory JonathanState.error() = Error;
  const factory JonathanState.loaded({required String message}) = Loaded;
}