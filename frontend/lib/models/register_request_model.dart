import 'dart:convert';

RegisterRequestModel registerRequestModel(String str){
  return RegisterRequestModel.fromJson(jsonDecode(str));
}

class RegisterRequestModel {
  String? email;
  String? password;
  String? name;
  String? surname;
  String? photo;
  String? position;
  String? number;
  String? tokenFCM;

  RegisterRequestModel({this.email, this.password, this.name, this.surname, this.photo, this.position, this.number, this.tokenFCM});

  String getEmail(){
    String returnEmail = email ?? 'default';
    return returnEmail;
  }

  RegisterRequestModel.fromJson(Map<String, dynamic> json) {
    email = json['email'];
    password = json['password'];
    name = json['name'];
    surname = json['surname'];
    photo = json['photo'];
    position = json['position'];
    number = json['number'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['email'] = email;
    data['password'] = password;
    data['name'] = name;
    data['surname'] = surname;
    data['photo'] = photo;
    data['position'] = position;
    data['number'] = number;
    data['tokenFCM'] = tokenFCM;
    return data;
  }
}