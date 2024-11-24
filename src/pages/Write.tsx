import React, {useState, useEffect, useRef, useMemo} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  Alert,
  Button,
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
import {getComments, getPosts, uploadComment, uploadPost} from '../backend';
import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
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
  boardTitle: {
    fontSize: 20,
    left: 50,
  },
  board_done_Title: {
    fontSize: 15,
    alignSelf: 'center',
    top: 3,
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

function Write({navigation}: Props) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "위치 권한",
          message: "이 앱은 사용자의 위치를 사용합니다.",
          buttonNeutral: "나중에",
          buttonNegative: "거부",
          buttonPositive: "허용"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("위치 권한이 허용되었습니다.");
      } else {
        console.log("위치 권한이 거부되었습니다.");
      }
    } catch (err) {
      console.log(err);
      console.warn(err);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const watchId = Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(latitude, longitude);
          const transformLatitude = Number(latitude);
          const transformLongitude = Number(longitude);
          setLatitude(transformLatitude);
          setLongitude(transformLongitude);
          Alert.alert(
            '현재 위치',
            `위도: ${transformLatitude}, 경도: ${transformLongitude}`
          );
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 1,
        }
      );
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('위치 오류', '위치를 가져오는 데 실패했습니다.');
    }
  };

  const handlePostSubmit = async () => {
    try {
      if (latitude === null || longitude === null) {
        Alert.alert('위치 오류', '현재 위치를 선택해주세요.');
      }
      if (title && body) {
        await uploadPost(title, body, 12, new db.GeoPoint(latitude || 0, longitude || 0), false);
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Please fill in both title and content');
      }
    } catch (error) {
      console.error('Error uploading post:', error);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.loginContainer}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{position: 'absolute', zIndex: 1}}>
          <Image
            source={require('../components/Cancel.png')}
            style={styles.back_logo}
          />
        </TouchableOpacity>
        <Text style={styles.boardTitle}>글쓰기</Text>
        <TouchableOpacity
          onPress={async () => {
            await handlePostSubmit();
          }}
          style={{position: 'absolute', right: 20, zIndex: 1}}>
          <View
            style={{
              width: 60,
              height: 30,
              backgroundColor: '#FFA629',
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Text style={styles.board_done_Title}>완료</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: 40,
          marginTop: 50,
          marginBottom: 30,
        }}
      >
        <Button title="현재 위치" onPress={getCurrentLocation} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="제목"
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { height: 300 }]}
          placeholder="내용을 입력하세요."
          value={body}
          onChangeText={setBody}
          multiline
        />
      </View>
    </View>
  );
}

export default Write;
