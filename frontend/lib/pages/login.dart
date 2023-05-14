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
  bool _isDoingFetch = false;

  void submit() async {
    setState(() {
      _isDoingFetch = true;
    });
    if (!validate()) {
      setState(() {
        _isDoingFetch = false;
      });
      return;
    }
    var tokenFCM = PushNotificationService.token!;
    APIService.login(_email.text, _password.text, tokenFCM).then((value) {
      if (value == 0) {
        Navigator.pushReplacementNamed(context, "/index");
      } else if (value == -1) {
        setState(() {
          _isDoingFetch = false;
        });
        CustomShowDialog.make(context, "Error", "Email or password incorrect");
      } else {
        setState(() {
          _isDoingFetch = false;
        });
        CustomShowDialog.make(
            context, "Error", "An error ocurred. Please try again later");
      }
    });
  }

  bool validate() {
    if (_email.text == '' || _password.text == '') {
      CustomShowDialog.make(
          context, "Error", "You must fill in all the fields");
      return false;
    }
    if (!emailValidator.hasMatch(_email.text)) {
      CustomShowDialog.make(context, "Error", "Invalid email");
      return false;
    }
    String tokenFCM = PushNotificationService.token ?? "";
    if (tokenFCM == "") {
      CustomShowDialog.make(context, "Error",
          "An error ocurried, please close the application and try again.\nIf the error persist reinstall the application");
      return false;
    }
    return true;
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        IgnorePointer(
          ignoring: _isDoingFetch,
          child: Scaffold(
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
                    CustomTextField(
                        textEditingController: _email,
                        text: "Email",
                        password: false,
                        number: false),
                    CustomTextField(
                        textEditingController: _password,
                        text: "Password",
                        password: true,
                        number: false),
                    Container(
                      margin: const EdgeInsets.only(top: 50),
                      child: SizedBox(
                          height: 50,
                          width: 240,
                          child: ElevatedButton(
                              style: ButtonStyle(
                                  shape: MaterialStateProperty.all<
                                          RoundedRectangleBorder>(
                                      RoundedRectangleBorder(
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
              )),
        ),
        if (_isDoingFetch)
          Container(
            color: Colors.black.withOpacity(0.5),
            child: const Center(
              child: CircularProgressIndicator(),
            ),
          ),
      ],
    );
  }
}
