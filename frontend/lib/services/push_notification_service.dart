import 'dart:async';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

class PushNotificationService {
  static FirebaseMessaging messaging = FirebaseMessaging.instance;
  static String? token;

  static final FlutterLocalNotificationsPlugin
      _flutterLocalNotificationsPlugin = FlutterLocalNotificationsPlugin();

  static Future<void> setUp() async {
    await Firebase.initializeApp();
    token = await FirebaseMessaging.instance.getToken();

    // Handlers
    FirebaseMessaging.onBackgroundMessage(_backgroundHandler);
    FirebaseMessaging.onMessage.listen(_onMessageHandler);
    FirebaseMessaging.onMessageOpenedApp.listen(_onMessageOpenApp);

    const AndroidInitializationSettings androidInitializationSettings =
        AndroidInitializationSettings("ic_launcher");
    const InitializationSettings initializationSettings =
        InitializationSettings(android: androidInitializationSettings);

    await _flutterLocalNotificationsPlugin.initialize(initializationSettings);
  }

  static Future<void> _backgroundHandler(RemoteMessage message) async {}

  static Future<void> _onMessageHandler(RemoteMessage message) async {
    _showNotification(
        message.notification?.title ?? "", message.notification?.body ?? "");
  }

  static Future<void> _onMessageOpenApp(RemoteMessage message) async {}

  static Future<void> _showNotification(String title, String body) async {
    if (title == "" || body == "") {
      return;
    }
    const AndroidNotificationDetails androidNotificationDetails =
        AndroidNotificationDetails("FoodHub", "FoodHub_Notifications",
            importance: Importance.max,
            priority: Priority.high,
            playSound: true);

    const NotificationDetails notificationDetails =
        NotificationDetails(android: androidNotificationDetails);

    await _flutterLocalNotificationsPlugin.show(
        1, title, body, notificationDetails);
  }
}
