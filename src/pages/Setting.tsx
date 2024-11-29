import React, {useState, useEffect, useRef, useMemo} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
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

const styles = StyleSheet.create({
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

function Setting({navigation}: Props) {
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchNickname = async () => {
      const uid = auth().currentUser?.uid;
      if (!uid) return '닉네임을 설정해주세요.';

      try {
        const doc = await db().collection('users').doc(uid).get();
        if (doc.exists) {
          setNickName(doc.data()?.nickname || '닉네임을 설정해주세요.');
          setEmail(doc.data()?.email || '이메일을 설정해주세요.');
        }
      } catch (error) {
        console.error('Error fetching nickname:', error);
      }
    };

    fetchNickname();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth().currentUser?.uid]);

  return (
    <View style={styles.loginContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{position: 'absolute', top: 25, left: 20, zIndex: 1}}>
        <Image
          source={require('../components/BackPage.jpg')}
          style={styles.back_logo}
        />
      </TouchableOpacity>
      <Text style={{marginLeft: 30, fontSize: 20}}>내 정보</Text>
      <View
        style={{
          position: 'relative',
          flexDirection: 'row',
          width: '100%',
          height: 80,
          marginTop: 30,
          borderRadius: 16,
          backgroundColor: '#E6E3E3',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <Image
          source={require('../components/Setting.png')}
          style={{
            position: 'absolute',
            width: 40,
            height: 40,
            marginLeft: 20,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            flex: 1,
          }}>
          {nickName} 님
        </Text>
      </View>
      <View style={{marginTop: 20}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>계정</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            paddingTop: 25,
          }}>
          <Text style={{fontSize: 16}}>이메일</Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'right',
              flexShrink: 1,
              color: '#B0AFAF',
            }}>
            {email}
          </Text>
        </View>
        {/*
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            paddingTop: 15,
          }}>
          <Text style={{fontSize: 16}}>비밀번호 변경</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            paddingTop: 15,
          }}>
          <Text style={{fontSize: 16}}>탈퇴</Text>
        </View>
        */}
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: '#B0AFAF',
          width: '100%',
          marginTop: 25,
        }}
      />
      {/*
      <View style={{marginTop: 20}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>환경 설정</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            paddingTop: 25,
          }}>
          <Text style={{fontSize: 16}}>공지 사항</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            paddingTop: 15,
          }}>
          <Text style={{fontSize: 16}}>신고</Text>
        </View>
      </View>
      */}
      <View
        style={{
          width: '100%',
          marginTop: 25,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{fontSize: 20, textAlign: 'center', color: '#FF0000'}}
          onPress={() => {
            GoogleSignin.revokeAccess();
            auth().signOut();
          }}>
          로그아웃
        </Text>
      </View>
    </View>
  );
}

export default Setting;
