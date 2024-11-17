import React, {useState, useEffect, useRef} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';
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
import {handleSignUp} from '../backend';

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
  const userRef = useRef<FirebaseAuthTypes.User | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    userRef.current = auth().currentUser;
    if (userRef.current?.email) {
      setEmail(userRef.current.email);
    }
  }, []);

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
        <TextInput style={stylesLogin.input} value={email} editable={false} />
        <TextInput
          style={stylesLogin.input}
          placeholder="이름"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={stylesLogin.input}
          placeholder="닉네임"
          value={nickname}
          onChangeText={setNickname}
          placeholderTextColor="#ccc"
        />
      </View>
      <TouchableOpacity
        style={stylesLogin.signUpButton}
        onPress={() => {
          handleSignUp(userRef, name, email, nickname, navigation);
        }}>
        <Text style={stylesLogin.signUpButtonText}>가입하기</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignUp;
