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
  Dimensions,
  Image,
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

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const stylesLogin = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: screenWidth - 120,
    marginTop: screenHeight * 10 / 100,
    height: 100,
    resizeMode: 'contain',
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: screenHeight * 20 / 100,
    fontSize: 18,
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
  authOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '60%',
    marginVertical: 10,
  },
});

function Login({navigation}: Props) {
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
      <Image source={require('../components/PinPostLogo.jpg')} style={[stylesLogin.logo]} />
      <Text style={stylesLogin.title}>아래 버튼을 통해 로그인</Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={GoogleLogin}
      />
      <View style={stylesLogin.authOptionsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text>회원가입  </Text>
        </TouchableOpacity>
        <Text>/</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <Text>  비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Main')}>
        <Text>클릭 테스트 (네이버 맵으로 이동)</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;
