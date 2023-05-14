class User {
  String? email;
  String? name;
  String? surname;
  String? photo;
  String? position;
  int? number;

  User(
      {required this.email,
      required this.name,
      required this.surname,
      required this.photo,
      required this.position,
      required this.number});

  User.fromJson(Map<String, dynamic> json) {
    email = json['email'];
    name = json['name'];
    surname = json['surname'];
    photo = json['photo'];
    position = json['position'];
    number = json['number'];
  }
}
