import '../../../../application/aman/aman_bloc.dart';
import '../../../core/imports/presentation.essentials.barrel.dart';

class AmanMainWidget extends StatefulWidget {
  const AmanMainWidget({Key? key}) : super(key: key);

  @override
  _AmanMainWidgetState createState() => _AmanMainWidgetState();
}

class _AmanMainWidgetState extends State<AmanMainWidget> {
  @override
  Widget build(BuildContext context) => Container(
        margin: const EdgeInsets.symmetric(horizontal: 12),
        child: BlocConsumer<AmanBloc, AmanState>(
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
