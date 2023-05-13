import 'package:frontend/imports.dart';

class Register extends StatefulWidget {
  const Register({super.key});

  @override
  State<Register> createState() => _RegisterState();
}

class _RegisterState extends State<Register> {
  @override
  void initState() {
    super.initState();
  }

  RegExp emailValidator = RegExp(
      r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$');

  final TextEditingController _email = TextEditingController();
  final TextEditingController _password = TextEditingController();
  final TextEditingController _password2 = TextEditingController();
  final TextEditingController _name = TextEditingController();
  final TextEditingController _surname = TextEditingController();
  final TextEditingController _number = TextEditingController();
  final TextEditingController _position = TextEditingController();

  void submit() async {
    if (!validate()) {
      return;
    }
    // Function to do the Register
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
              CustomTextField(textEditingController: _name, text: "Name", password: false, number: false),
              CustomTextField(textEditingController: _surname, text: "Surname", password: false, number: false),
              CustomTextField(textEditingController: _number, text: "Number", password: false, number: true),
              CustomTextField(textEditingController: _position, text: "Position", password: false, number: false),
              CustomTextField(textEditingController: _email, text: "Email", password: false, number: false),
              CustomTextField(textEditingController: _password, text: "Password", password: true, number: false),
              CustomTextField(textEditingController: _password2, text: "Repeat password", password: true, number: false),
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
                          'Register',
                          style: TextStyle(fontSize: 22),
                        ))),
              ),
              Container(
                  margin: const EdgeInsets.only(top: 40),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Text(
                        "Do you have an account? ",
                        style: TextStyle(
                            fontSize: 18, fontWeight: FontWeight.w400),
                      ),
                      GestureDetector(
                          onTap: () {
                            Navigator.pop(context);
                          },
                          child: const Text(
                            "Login!",
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
