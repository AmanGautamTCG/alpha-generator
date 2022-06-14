part of 'sample_bloc.dart';

@freezed
class SampleEvent with _$SampleEvent {
  const factory SampleEvent.initiate() = Initiate;
  const factory SampleEvent.refresh() = Refresh;
}