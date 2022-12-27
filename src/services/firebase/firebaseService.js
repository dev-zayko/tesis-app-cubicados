import messaging from '@react-native-firebase/messaging';

const checkToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    return fcmToken;
  }
};
export default {
  checkToken,
};
