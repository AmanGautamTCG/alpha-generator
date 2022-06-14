part of 'aman_bloc.dart';

@freezed
class AmanState with _$AmanState {
  const factory AmanState.initial() = Initial;
  const factory AmanState.loading() = Loading;
  const factory AmanState.error() = Error;
  const factory AmanState.loaded({required String message}) = Loaded;
}