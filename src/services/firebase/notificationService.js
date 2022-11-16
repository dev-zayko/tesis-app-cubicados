import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

const backgroundNotification = () => {
  //Register background handler
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
};

const foregroundNotification = () => {
  messaging().onMessage(async remoteMessage => {
    //Creamos el canal de notificacion
    PushNotification.createChannel(
      {
        channelId: '77195440',
        channelName: 'cubicadosChannelNamex',
        channelDescription: 'Notification for special message',
        importance: 4,
        vibrate: true,
      },
      created => console.log(`${created}`),
    );
    PushNotification.localNotification({
      channelId: '77195440',
      message: remoteMessage.notification.body,
      title: remoteMessage.notification.title,
      bigPictureUrl: remoteMessage.notification.android.imageUrl,
      smallIcon: remoteMessage.notification.android.imageUrl,
    });
  });
};
export default {
  backgroundNotification,
  foregroundNotification,
};
