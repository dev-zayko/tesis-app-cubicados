import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const signIn = async () => {
  try {
    await GoogleSignin.configure({
      androidClientId:
        '313587407909-9c55vbns55uhrjo466kfsdj8k2um7mda.apps.googleusercontent.com',
    });
    await GoogleSignin.hasPlayServices();
    return await GoogleSignin.signIn();
  } catch (error) {
    console.log(error);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};

const signOut = async () => {
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    console.log(error);
  }
};

const isSignedIn = async () => {
  return await GoogleSignin.isSignedIn();
};

export default {
  signIn,
  signOut,
  isSignedIn,
};
