import '../../domain/user/i_user_facade.dart';
import '../core/essentials.barrel.dart';

part 'user_bloc.freezed.dart';
part 'user_event.dart';
part 'user_state.dart';

IUserFacade get iUserFacade => getIt<IUserFacade>();
Logger get logger => getIt<Logger>();

@lazySingleton
class UserBloc extends Bloc<UserEvent, UserState>
    with BlocLogging<UserBloc, UserEvent, UserState> {
  UserBloc() : super(const UserState.initial()) {
    on<Initiate>(_onInitiate);
  }

  Future<void> _onInitiate(UserEvent event, Emitter<UserState> emit) async {

  }

}
