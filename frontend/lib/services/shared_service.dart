import 'package:shared_preferences/shared_preferences.dart';
import 'package:frontend/imports.dart';

class SharedService {
  static late SharedPreferences prefs;

  static Future<void> setUp() async {
    prefs = await SharedPreferences.getInstance();
  }

  static Future<bool> isLoggedIn() async {
    bool isKeyExists = prefs.containsKey('token');
    if (isKeyExists) {
      String token = prefs.getString('token') ?? 'default';
      return await APIService.isValidToken(token);
    } else {
      return false;
    }
  }

  static Future<void> setLogginDetails(
      RegisterRequestModel model, String token) async {
    var email = model.email;
    var name = model.name;
    var surname = model.surname;
    var photo = model.photo;
    var position = model.position;
    var number = model.number;
    if (name != null &&
        token != "" &&
        email != null &&
        surname != null &&
        position != null &&
        number != null &&
        photo != null) {
      await prefs.setString('name', name);
      await prefs.setString('surname', surname);
      await prefs.setString('email', email);
      await prefs.setString('position', position);
      await prefs.setInt('number', number);
      await prefs.setString('token', token);
      await prefs.setString("photo", photo);
    }
  }
}
