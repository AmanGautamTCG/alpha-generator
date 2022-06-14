import '../../core/imports/presentation.essentials.barrel.dart';
import 'widgets/widget_aman_main.dart';

class AmanPage extends StatefulWidget {
  const AmanPage({Key? key}) : super(key: key);

 @override
  Widget build(BuildContext context) => const SafeArea(
        child: Scaffold(
          body: AmanMainWidget(),
        ),
      );
}
