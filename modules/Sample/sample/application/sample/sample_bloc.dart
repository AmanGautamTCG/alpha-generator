import '../../domain/sample/i_sample_facade.dart';
import '../core/essentials.barrel.dart';

part 'sample_bloc.freezed.dart';
part 'sample_event.dart';
part 'sample_state.dart';

ISampleFacade get iSampleFacade => getIt<ISampleFacade>();
Logger get logger => getIt<Logger>();

@lazySingleton
class SampleBloc extends Bloc<SampleEvent, SampleState>
    with BlocLogging<SampleBloc, SampleEvent, SampleState> {
  SampleBloc() : super(const SampleState.initial()) {
    on<Initiate>(_onInitiate);
  }

  Future<void> _onInitiate(SampleEvent event, Emitter<SampleState> emit) async {

  }

}
