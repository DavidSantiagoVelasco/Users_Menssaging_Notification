import 'dart:io';
import 'package:cloudinary_public/cloudinary_public.dart';
import 'package:frontend/imports.dart';
import 'package:image_picker/image_picker.dart';

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
  String _photo = "https://bit.ly/3Lstjcq";
  File? _image;

  void _submit() async {
    if (!_validate()) {
      return;
    }
    if (_image != null) {
      await _uploadImageToCloudinary(_image!).then((value) {
        if (value != null) {
          setState(() {
            _photo = value;
          });
        }
      });
    }
    var tokenFCM = PushNotificationService.token!;
    RegisterRequestModel user = RegisterRequestModel(
        email: _email.text,
        password: _password.text,
        name: _name.text,
        surname: _surname.text,
        photo: _photo,
        position: _position.text,
        number: _number.text,
        tokenFCM: tokenFCM);
    APIService.registerUser(user).then((value) {
      if(value == 0){
        CustomShowDialog.make(context, "Success", "User created successfully");
        Navigator.pushReplacementNamed(context, "/index");
      }else if(value == -1){
        CustomShowDialog.make(context, "Error", "Email already registered");
      } else if(value == -2){
        CustomShowDialog.make(context, "Error", "Failed to created user"); 
      } else {
        CustomShowDialog.make(context, "Error", "An error ocurred. Please try again later");
      }
    });
  }

  bool _validate() {
    if (_email.text == '' ||
        _password.text == '' ||
        _password2.text == '' ||
        _name.text == '' ||
        _surname.text == '' ||
        _number.text == '' ||
        _position.text == '') {
          CustomShowDialog.make(context, "Error", "You must fill in all the fields");
      return false;
    }
    if (!emailValidator.hasMatch(_email.text)) {
      CustomShowDialog.make(context, "Error", "Invalid email");
      return false;
    }
    if (_password.text != _password2.text) {
      CustomShowDialog.make(context, "Error", "Passwords do not match");
      return false;
    }
    String tokenFCM = PushNotificationService.token ?? "";
    if (tokenFCM == "") {
      CustomShowDialog.make(context, "Error", "An error ocurried, please close the application and try again.\nIf the error persist reinstall the application");
      return false;
    }
    return true;
  }

  Future<void> _pickImage(ImageSource source) async {
    final pickedImage = await ImagePicker().pickImage(source: source);
    if (pickedImage != null) {
      setState(() {
        _image = File(pickedImage.path);
      });
    }
  }

  void _showModal() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('ADD A PHOTO'),
          content: const Text('Select photo from: '),
          actions: [
            TextButton(
              onPressed: () {
                _pickImage(ImageSource.camera);
                Navigator.of(context).pop();
              },
              child: const Text('Camera', style: TextStyle(color: Colors.blue)),
            ),
            TextButton(
              onPressed: () async {
                final ImagePicker picker = ImagePicker();
                await picker
                    .pickImage(
                  source: ImageSource.gallery,
                  maxWidth: 500,
                  maxHeight: 500,
                )
                    .then((value) {
                  if (value != null) {
                    setState(() {
                      _image = File(value.path);
                    });
                  }
                  Navigator.of(context).pop();
                });
              },
              child: const Text('Galery', style: TextStyle(color: Colors.blue)),
            ),
          ],
        );
      },
    );
  }

  Future<String?> _uploadImageToCloudinary(File imageFile) async {
    final cloudinary = CloudinaryPublic(Config.cloudinaryCloudName, Config.cloudinaryuploadPreset);
    try {
      final response = await cloudinary.uploadFile(
        CloudinaryFile.fromFile(imageFile.path),
      );
      return response.secureUrl;
    } catch (e) {
      return null;
    }
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
              CustomTextField(
                  textEditingController: _name,
                  text: "Name",
                  password: false,
                  number: false),
              CustomTextField(
                  textEditingController: _surname,
                  text: "Surname",
                  password: false,
                  number: false),
              CustomTextField(
                  textEditingController: _number,
                  text: "Number",
                  password: false,
                  number: true),
              CustomTextField(
                  textEditingController: _position,
                  text: "Position",
                  password: false,
                  number: false),
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
              CustomTextField(
                  textEditingController: _password2,
                  text: "Repeat password",
                  password: true,
                  number: false),
              Container(
                alignment: Alignment.centerLeft,
                margin: const EdgeInsets.only(top: 10, bottom: 10, left: 28),
                child: const Text("Your photo: ",
                    style:
                        TextStyle(fontSize: 18, fontWeight: FontWeight.w400)),
              ),
              Container(
                height: 200,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: Colors.white,
                    width: 2,
                  ),
                  image: DecorationImage(
                      fit: BoxFit.scaleDown,
                      image: _image != null
                          ? FileImage(_image!)
                          : NetworkImage(_photo) as ImageProvider<Object>),
                ),
                child: Container(
                  margin: const EdgeInsets.only(right: 60),
                  child: Align(
                    alignment: Alignment.bottomRight,
                    child: Container(
                      decoration: const BoxDecoration(
                        shape: BoxShape.circle,
                        color: Colors.grey,
                      ),
                      child: IconButton(
                        onPressed: () {
                          _showModal();
                        },
                        icon: const Icon(
                          Icons.edit,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
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
                        onPressed: () => _submit(),
                        child: const Text(
                          'Register',
                          style: TextStyle(fontSize: 22),
                        ))),
              ),
              Container(
                  margin: const EdgeInsets.only(top: 40, bottom: 80),
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
