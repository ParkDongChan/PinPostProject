import React, {useEffect} from 'react';
import {GoogleLogin, initialGoogleLogin} from '../backend';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
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

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const stylesLogin = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: screenWidth - 120,
    marginTop: (screenHeight * 10) / 100,
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
    marginTop: (screenHeight * 20) / 100,
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
  useEffect(initialGoogleLogin, []);

  return (
    <View style={stylesLogin.loginContainer}>
      <Image
        source={require('../components/PinPostLogo.jpg')}
        style={[stylesLogin.logo]}
      />
      <Text style={stylesLogin.title}>아래 버튼을 통해 로그인</Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => {
          GoogleLogin(navigation);
        }}
      />
      <View style={stylesLogin.authOptionsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text>회원가입 </Text>
        </TouchableOpacity>
        <Text>/</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <Text> 비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Main')}>
        <Text>클릭 테스트 (네이버 맵으로 이동)</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;
