import '../../../../application/jonathan/jonathan_bloc.dart';
import '../../../core/imports/presentation.essentials.barrel.dart';

class JonathanMainWidget extends StatefulWidget {
  const JonathanMainWidget({Key? key}) : super(key: key);

  @override
  _JonathanMainWidgetState createState() => _JonathanMainWidgetState();
}

class _JonathanMainWidgetState extends State<JonathanMainWidget> {
  @override
  Widget build(BuildContext context) => Container(
        margin: const EdgeInsets.symmetric(horizontal: 12),
        child: BlocConsumer<JonathanBloc, JonathanState>(
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
