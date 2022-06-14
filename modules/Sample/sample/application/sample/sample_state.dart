part of 'sample_bloc.dart';

@freezed
class SampleState with _$SampleState {
  const factory SampleState.initial() = Initial;
  const factory SampleState.loading() = Loading;
  const factory SampleState.error() = Error;
  const factory SampleState.loaded({required String message}) = Loaded;
}