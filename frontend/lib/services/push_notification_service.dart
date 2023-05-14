import 'dart:async';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';

class PushNotificationService {
  static FirebaseMessaging messaging = FirebaseMessaging.instance;
  static String? token;

  static Future<void> setUp() async {
    await Firebase.initializeApp();
    token = await FirebaseMessaging.instance.getToken();

    // Handlers
    FirebaseMessaging.onBackgroundMessage(_backgroundHandler);
    FirebaseMessaging.onMessage.listen(_onMessageHandler);
    FirebaseMessaging.onMessageOpenedApp.listen(_onMessageOpenApp);
  }

  static Future<void> _backgroundHandler(RemoteMessage message) async {}

  static Future<void> _onMessageHandler(RemoteMessage message) async {}

  static Future<void> _onMessageOpenApp(RemoteMessage message) async {}
}
