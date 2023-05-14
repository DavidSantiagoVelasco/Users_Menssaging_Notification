import 'package:frontend/imports.dart';

class Index extends StatefulWidget {
  const Index({super.key});

  @override
  State<Index> createState() => _IndexState();
}

class _IndexState extends State<Index> {
  late final List<User> _users = [];

  @override
  void initState() {
    super.initState();
    _getUsers();
  }

  Future<void> _getUsers() async {
    APIService.getUsers().then((value) {
      setState(() {
        _users.addAll(value);
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Users'),
        backgroundColor: Colors.blue,
        automaticallyImplyLeading: false,
        actions: [
          IconButton(
            icon: const Icon(Icons.logout_outlined),
            onPressed: (() async {
              SharedService.prefs.clear();
              Navigator.pushReplacementNamed(context, "/login");
            }),
          )
        ],
      ),
      body: ListView.builder(
        itemCount: _users.length,
        itemBuilder: (context, index) {
          final user = _users[index];
          return GestureDetector(
            onTap: () {
              print("Message");
            },
            child: Item(user: user),
          );
        },
      ),
    );
  }
}
