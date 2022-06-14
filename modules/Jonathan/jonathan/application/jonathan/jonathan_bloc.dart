import '../../domain/jonathan/i_jonathan_facade.dart';
import '../core/essentials.barrel.dart';

part 'jonathan_bloc.freezed.dart';
part 'jonathan_event.dart';
part 'jonathan_state.dart';

IJonathanFacade get iJonathanFacade => getIt<IJonathanFacade>();
Logger get logger => getIt<Logger>();

@lazySingleton
class JonathanBloc extends Bloc<JonathanEvent, JonathanState>
    with BlocLogging<JonathanBloc, JonathanEvent, JonathanState> {
  JonathanBloc() : super(const JonathanState.initial()) {
    on<Initiate>(_onInitiate);
  }

  Future<void> _onInitiate(JonathanEvent event, Emitter<JonathanState> emit) async {

  }

}
