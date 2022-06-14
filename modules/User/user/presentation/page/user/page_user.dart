import '../../../application/user/user_bloc.dart';
import '../../core/imports/presentation.essentials.barrel.dart';
import 'widgets/widget_user_main.dart';

class UserPage extends StatefulWidget {
  const UserPage({Key? key}) : super(key: key);

 @override
  Widget build(BuildContext context) => const SafeArea(
        child: Scaffold(
          body: UserMainWidget(),
        ),
      );
}
