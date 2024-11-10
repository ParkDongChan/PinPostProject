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

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const stylesLogin = StyleSheet.create({
  loginContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  Top: {
    flexDirection: 'row',
    width: '100%',
  },
  back_logo: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 8,
  },
  signUpButton: {
    width: '100%',
    backgroundColor: '#7AE270',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  authOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});

function SignUp({navigation}: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');

  return (
    <View style={stylesLogin.loginContainer}>
      <TouchableOpacity
        style={stylesLogin.Top}
        onPress={() => navigation.goBack()}>
        <Image
          source={require('../components/BackPage.jpg')}
          style={[stylesLogin.back_logo]}
        />
        <Image
          source={require('../components/PinPostLogo.jpg')}
          style={[stylesLogin.logo]}
        />
      </TouchableOpacity>
      <View style={stylesLogin.inputContainer}>
        <TextInput
          style={stylesLogin.input}
          placeholder="이름"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={stylesLogin.input}
          placeholder="이메일"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={stylesLogin.input}
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={stylesLogin.input}
          placeholder="비밀번호 재확인"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TextInput
          style={stylesLogin.input}
          placeholder="닉네임"
          value={nickname}
          onChangeText={setNickname}
        />
      </View>
      <TouchableOpacity
        style={stylesLogin.signUpButton}
        onPress={() => console.log('가입하기')}>
        <Text style={stylesLogin.signUpButtonText}>가입하기</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignUp;
