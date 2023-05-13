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

  final TextEditingController _email = TextEditingController();
  final TextEditingController _password = TextEditingController();

  void submit() async {
    if (!validate()) {
      return;
    }
    // Function to do the login
  }

  bool validate() {
    if (_email.text == '' || _password.text == '') {
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
    if (!emailValidator.hasMatch(_email.text)) {
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
        body: SingleChildScrollView(
          child: Column(
            children: [
              Container(
                margin: const EdgeInsets.only(top: 70),
                child: Image.asset(
                  'lib/assets/flutter-logo.png',
                  height: 190,
                  width: 350,
                ),
              ),
              CustomTextField(textEditingController: _email, text: "Email", password: false, number: false),
              CustomTextField(textEditingController: _password, text: "Password", password: true, number: false),
              Container(
                margin: const EdgeInsets.only(top: 50),
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
              ),
              Container(
                  margin: const EdgeInsets.only(top: 40),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Text(
                        "You don't have an account? ",
                        style: TextStyle(
                            fontSize: 18, fontWeight: FontWeight.w400),
                      ),
                      GestureDetector(
                          onTap: () {
                            Navigator.pushNamed(context, "/register");
                          },
                          child: const Text(
                            "Sign up!",
                            style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.w400,
                                color: Colors.blue),
                          )),
                    ],
                  ))
            ],
          ),
        ));
  }
}
