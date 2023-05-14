import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:frontend/imports.dart';

class APIService {

  static Future<bool> isValidToken(String token) async {
    Uri url = Uri.http(Config.apiURL, Config.isValidTokenAPI);
    final header = {
      "Access-Control-Allow-Origin": "*",
      'Content-Type': 'application/json',
      'Accept': '*/*'
    };
    try {
      final response = await http
          .post(url, headers: header, body: jsonEncode({'token': token}))
          .timeout(const Duration(seconds: 3));
      if (response.statusCode == 200) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  static Future<int> registerUser(RegisterRequestModel user) async {
    Uri url = Uri.http(Config.apiURL, Config.registerUser);
    final header = {
      "Access-Control-Allow-Origin": "*",
      'Content-Type': 'application/json',
      'Accept': '*/*'
    };
    try {
      final response = await http
          .post(url, headers: header, body: json.encode(user.toJson()))
          .timeout(const Duration(seconds: 3));
      if (response.statusCode == 200) {
        return 0;
      } else if(response.statusCode == 409){
        return -1;
      } else {
        return -2;
      }
    } catch (e) {
      return -3;
    }
  }
}