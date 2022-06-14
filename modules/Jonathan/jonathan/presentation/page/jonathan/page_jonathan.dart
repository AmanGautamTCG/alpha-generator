import '../../core/imports/presentation.essentials.barrel.dart';
import 'widgets/widget_jonathan_main.dart';

class JonathanPage extends StatefulWidget {
  const JonathanPage({Key? key}) : super(key: key);

 @override
  Widget build(BuildContext context) => const SafeArea(
        child: Scaffold(
          body: JonathanMainWidget(),
        ),
      );
}
