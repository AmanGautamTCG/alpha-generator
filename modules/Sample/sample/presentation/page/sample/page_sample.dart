import '../../../application/sample/sample_bloc.dart';
import '../../core/imports/presentation.essentials.barrel.dart';
import 'widgets/widget_sample_main.dart';

class SamplePage extends StatefulWidget {
  const SamplePage({Key? key}) : super(key: key);

 @override
  Widget build(BuildContext context) => const SafeArea(
        child: Scaffold(
          body: SampleMainWidget(),
        ),
      );
}
