part of 'jonathan_bloc.dart';

@freezed
class JonathanEvent with _$JonathanEvent {
  const factory JonathanEvent.initiate() = Initiate;
  const factory JonathanEvent.refresh() = Refresh;
}