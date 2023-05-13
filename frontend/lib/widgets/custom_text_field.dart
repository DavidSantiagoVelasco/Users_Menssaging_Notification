import 'package:flutter/services.dart';
import 'package:frontend/imports.dart';

class CustomTextField extends StatelessWidget {
  final TextEditingController textEditingController;
  final String text;
  final bool password;
  final bool number;

  const CustomTextField(
      {super.key, required this.textEditingController, required this.text, required this.password, required this.number});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.only(left: 15, right: 15),
      child: TextField(
        controller: textEditingController,
        decoration: InputDecoration(
            border: const OutlineInputBorder(), labelText: text),
            obscureText: password,
        inputFormatters: number ? <TextInputFormatter>[
          FilteringTextInputFormatter.digitsOnly
        ]: [],
        keyboardType: number ? TextInputType.number: TextInputType.text,
      ),
    );
  }
}
