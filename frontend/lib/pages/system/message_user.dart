import 'package:frontend/imports.dart';

class MessageUser extends StatefulWidget {
  final User user;
  const MessageUser({super.key, required this.user});

  @override
  State<MessageUser> createState() => _MessageUserState();
}

class _MessageUserState extends State<MessageUser> {
  final TextEditingController _title = TextEditingController();
  final TextEditingController _message = TextEditingController();
  bool _isDoingFetch = false;

  @override
  void initState() {
    super.initState();
  }

  void _send() async {
    setState(() {
      _isDoingFetch = true;
    });
    if (!_validate()) {
      setState(() {
        _isDoingFetch = false;
      });
      return;
    }
    if (widget.user.email == null) {
      CustomShowDialog.make(context, "Error",
          "It is not possible send the message, please try again later");
      return;
    }
    await APIService.sendMessage(_title.text, _message.text, widget.user.email!)
        .then((value) {
      if (value == 0) {
        CustomShowDialog.make(context, "Success", "Message sent successfully");
      } else if (value == 1) {
        CustomShowDialog.make(context, "Error",
            "The message could not be sent because the user cannot be reached at this time");
      } else {
        CustomShowDialog.make(
            context, "Error", "An error ocurred. Please try again later");
      }
    });
    setState(() {
      _isDoingFetch = false;
    });
  }

  bool _validate() {
    if (_title.text == '' || _message.text == '') {
      CustomShowDialog.make(
          context, "Error", "You must fill in all the fields");
      return false;
    }
    return true;
  }

  void _logout() async {
    await APIService.logout().then((value) {
      Navigator.pop(context);
      Navigator.pushReplacementNamed(context, "/login");
    });
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        IgnorePointer(
          ignoring: _isDoingFetch,
          child: Scaffold(
            appBar: AppBar(
              backgroundColor: Colors.blue,
              automaticallyImplyLeading: false,
              leading: IconButton(
                icon: const Icon(Icons.arrow_back),
                onPressed: () {
                  Navigator.pop(context);
                },
              ),
              actions: [
                IconButton(
                  icon: const Icon(Icons.logout_outlined),
                  onPressed: _logout,
                )
              ],
            ),
            body: SingleChildScrollView(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
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
                            image: NetworkImage(widget.user.photo!)),
                      )),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(("Name: ${widget.user.name} ${widget.user.surname}"),
                          textAlign: TextAlign.left,
                          style: const TextStyle(fontSize: 15)),
                      const SizedBox(
                        height: 2,
                      ),
                      Text(("Email: ${widget.user.email}"),
                          textAlign: TextAlign.left,
                          style: const TextStyle(fontSize: 15)),
                      const SizedBox(
                        height: 2,
                      ),
                      Text(("Number: ${widget.user.number}"),
                          textAlign: TextAlign.left,
                          style: const TextStyle(fontSize: 15)),
                      const SizedBox(
                        height: 2,
                      ),
                      Text(("Position: ${widget.user.position}"),
                          textAlign: TextAlign.left,
                          style: const TextStyle(fontSize: 15))
                    ],
                  ),
                  const SizedBox(height: 15),
                  Container(
                    margin: const EdgeInsets.only(top: 20),
                    padding: const EdgeInsets.only(left: 15),
                    alignment: Alignment.centerLeft,
                    child: const Text(
                      "Send a message",
                      textAlign: TextAlign.start,
                      style:
                          TextStyle(fontSize: 25, fontWeight: FontWeight.w300),
                    ),
                  ),
                  const SizedBox(height: 15),
                  CustomTextField(
                      textEditingController: _title,
                      text: "Title",
                      password: false,
                      number: false),
                  const SizedBox(height: 16),
                  Container(
                    margin: const EdgeInsets.only(bottom: 10),
                    padding: const EdgeInsets.only(left: 15, right: 15),
                    child: TextField(
                      controller: _message,
                      decoration: const InputDecoration(
                          border: OutlineInputBorder(), labelText: "Message"),
                      maxLines: 3,
                      minLines: 2,
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
                                        RoundedRectangleBorder>(
                                    RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(18.0),
                            ))),
                            onPressed: _send,
                            child: const Text(
                              'Send',
                              style: TextStyle(fontSize: 22),
                            ))),
                  ),
                ],
              ),
            ),
          ),
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
