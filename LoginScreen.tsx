import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
  isErrorWithCode,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

const stylesLogin = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

function LoginScreen() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '215594584032-mj6lq9omiq8dm80ustqqanmoe45iljsp.apps.googleusercontent.com',
    });
  }, []);

  const GoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (response.type === 'success') {
        if (response.data.user.email.endsWith('@g.skku.edu')) {
          const googleCredential = auth.GoogleAuthProvider.credential(
            response.data.idToken,
          );
          const res = await auth().signInWithCredential(googleCredential);
        } else {
          Alert.alert('Alert', "It's not a SKKU email. Please use g.skku.edu", [
            {text: '확인'},
          ]);
          try {
            await GoogleSignin.revokeAccess();
            // Google Account disconnected from your app.
            // Perform clean-up actions, such as deleting data associated with the disconnected account.
          } catch (error) {
            console.error(error);
          }
        }
      } else {
        console.log('cancelled by user');
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  return (
    <View style={stylesLogin.loginContainer}>
      <Text style={stylesLogin.title}>로그인</Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={GoogleLogin}
      />
    </View>
  );
}

export default LoginScreen;
