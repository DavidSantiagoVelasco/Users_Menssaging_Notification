import 'package:frontend/imports.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await SharedService.setUp();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'User Messaging Notification',
      debugShowCheckedModeBanner: false,
      home: const IsLoggedMiddleware(),
      routes: {
        '/login': (context) => const Login(),
        '/register': (context) => const Register()
      },
    );
  }
}