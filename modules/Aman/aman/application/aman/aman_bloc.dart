import '../../domain/aman/i_aman_facade.dart';
import '../core/essentials.barrel.dart';

part 'aman_bloc.freezed.dart';
part 'aman_event.dart';
part 'aman_state.dart';

IAmanFacade get iAmanFacade => getIt<IAmanFacade>();
Logger get logger => getIt<Logger>();

@lazySingleton
class AmanBloc extends Bloc<AmanEvent, AmanState>
    with BlocLogging<AmanBloc, AmanEvent, AmanState> {
  AmanBloc() : super(const AmanState.initial()) {
    on<Initiate>(_onInitiate);
  }

  Future<void> _onInitiate(AmanEvent event, Emitter<AmanState> emit) async {

  }

}
