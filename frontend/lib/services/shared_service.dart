import 'package:shared_preferences/shared_preferences.dart';
import 'package:frontend/imports.dart';

class SharedService{
  
  static late SharedPreferences prefs;

  static Future<void> setUp() async{
    prefs = await SharedPreferences.getInstance();
  }

  static Future<bool> isLoggedIn() async {
    bool isKeyExists = prefs.containsKey('token');
    if(isKeyExists){
      String token = prefs.getString('token') ?? 'default';
      return await APIService.isValidToken(token);
    }else{
      return false;
    }
  }

}