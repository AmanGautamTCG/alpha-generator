part of 'aman_bloc.dart';

@freezed
class AmanEvent with _$AmanEvent {
  const factory AmanEvent.initiate() = Initiate;
  const factory AmanEvent.refresh() = Refresh;
}