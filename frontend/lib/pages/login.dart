import 'package:frontend/imports.dart';

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {

  @override
  void initState() {
    super.initState();
  }

  RegExp emailValidator = RegExp(
      r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$');

  final email = TextEditingController();
  final password = TextEditingController();
  var token = '';

  void submit() async {
    if (validate()) {
      // Function to do the login
    }
  }

  bool validate() {
    if (email.text == '' || password.text == '') {
      showDialog(
          context: context,
          builder: (context) => AlertDialog(
                title: const Text('Error'),
                content: const Text('You must fill in all the fields'),
                actions: [
                  TextButton(
                      onPressed: () {
                        Navigator.pop(context);
                      },
                      child: const Text('Ok')),
                ],
              ));
      return false;
    }
    if (!emailValidator.hasMatch(email.text)) {
      showDialog(
          context: context,
          builder: (context) => AlertDialog(
                title: const Text('Error'),
                content: const Text('Invalid email'),
                actions: [
                  TextButton(
                      onPressed: () {
                        Navigator.pop(context);
                      },
                      child: const Text('Ok')),
                ],
              ));
      return false;
    }
    return true;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.white,
        body: Center(
            child: SingleChildScrollView(
          child: Column(
            children: [
              Container(
                // margin: const EdgeInsets.only(top: 20),
                alignment: Alignment.center,
                child: Image.asset(
                  'lib/assets/flutter-logo.png',
                  height: 190,
                  width: 350,
                ),
              ),
              Container(
                padding: const EdgeInsets.only(left: 15, right: 15),
                child: TextField(
                  controller: email,
                  decoration: const InputDecoration(
                      border: OutlineInputBorder(), labelText: 'Email'),
                ),
              ),
              Container(
                margin: const EdgeInsets.only(top: 13),
                padding: const EdgeInsets.only(left: 15, right: 15),
                child: TextField(
                    controller: password,
                    decoration: const InputDecoration(
                        border: OutlineInputBorder(), labelText: 'Password'),
                    obscureText: true),
              ),
              Container(
                margin: const EdgeInsets.only(top: 50, bottom: 150),
                child: SizedBox(
                    height: 50,
                    width: 240,
                    child: ElevatedButton(
                        style: ButtonStyle(
                            shape: MaterialStateProperty.all<
                                RoundedRectangleBorder>(RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(18.0),
                        ))),
                        onPressed: () => submit(),
                        child: const Text(
                          'Login',
                          style: TextStyle(fontSize: 22),
                        ))),
              )
            ],
          ),
        )));
  }
}
