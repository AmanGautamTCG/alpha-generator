import '../../../../application/user/user_bloc.dart';
import '../../../core/imports/presentation.essentials.barrel.dart';

class UserMainWidget extends StatefulWidget {
  const UserMainWidget({Key? key}) : super(key: key);

  @override
  _UserMainWidgetState createState() => _UserMainWidgetState();
}

class _UserMainWidgetState extends State<UserMainWidget> {
  @override
  Widget build(BuildContext context) => Container(
        margin: const EdgeInsets.symmetric(horizontal: 12),
        child: BlocConsumer<UserBloc, UserState>(
          listener: (context, state) {},
          builder: (context, state) => state.maybeMap(
 orElse: () => const SizedBox.shrink(),
            loaded: (s) => SingleChildScrollView(
              child: Column(children: [
                Text('Hy'),
              ]),
            ),
           
          ),
        ),
      );
}
