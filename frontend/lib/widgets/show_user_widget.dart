import 'package:frontend/imports.dart';

class Item extends StatelessWidget {
  final User user;

  const Item({super.key, required this.user});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
          border: Border(bottom: BorderSide(color: Colors.black))),
      margin: const EdgeInsets.only(top: 20),
      padding: const EdgeInsets.only(bottom: 20),
      child: Row(
        children: [
          Expanded(
              child: Column(
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(10),
                child: Image.network(
                  user.photo as String,
                  fit: BoxFit.cover,
                  height: 75,
                  width: 75,
                  alignment: Alignment.centerRight,
                ),
              )
            ],
          )),
          Expanded(
            flex: 2,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(("${user.name} ${user.surname!}"),
                    textAlign: TextAlign.left,
                    style: const TextStyle(fontSize: 18)),
                    Container(
                      margin: const EdgeInsets.only(bottom: 20),
                    ),
                Text("${user.email}",
                    textAlign: TextAlign.left,
                    style: const TextStyle(fontSize: 18))
              ],
            ),
          )
        ],
      ),
    );
  }
}
