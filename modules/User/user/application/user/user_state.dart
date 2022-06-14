part of 'user_bloc.dart';

@freezed
class UserState with _$UserState {
  const factory UserState.initial() = Initial;
  const factory UserState.loading() = Loading;
  const factory UserState.error() = Error;
  const factory UserState.loaded({required String message}) = Loaded;
}