import '../../../../application/sample/sample_bloc.dart';
import '../../../core/imports/presentation.essentials.barrel.dart';

class SampleMainWidget extends StatefulWidget {
  const SampleMainWidget({Key? key}) : super(key: key);

  @override
  _SampleMainWidgetState createState() => _SampleMainWidgetState();
}

class _SampleMainWidgetState extends State<SampleMainWidget> {
  @override
  Widget build(BuildContext context) => Container(
        margin: const EdgeInsets.symmetric(horizontal: 12),
        child: BlocConsumer<SampleBloc, SampleState>(
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
