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
import {PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Dialog from 'react-native-dialog';

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
  const [dialogVisible, setDialogVisible] = useState(false);
  const [tempLatitude, setTempLatitude] = useState('');
  const [tempLongitude, setTempLongitude] = useState('');
  const [matchingLocations, setMatchingLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const buildingRanges = [
    {
      label: '제 1공학관',
      value: 'Building A',
      minLat: 37.29432,
      maxLat: 37.29432,
      minLng: 126.9767,
      maxLng: 126.9767,
    },
    {
      label: '제 2공학관',
      value: 'Building B',
      minLat: 37.2955185,
      maxLat: 37.2955185,
      minLng: 126.9768856,
      maxLng: 126.976885,
    },
    {
      label: '삼성학술 정보관',
      value: 'Building C',
      minLat: 37.2940342,
      maxLat: 37.2940342,
      minLng: 126.9749593,
      maxLng: 126.9749593,
    },
    {
      label: '학생회관',
      value: 'Building D',
      minLat: 37.2942421,
      maxLat: 37.2942421,
      minLng: 126.9735993,
      maxLng: 126.9735993,
    },
    {
      label: 'N센터',
      value: 'Building E',
      minLat: 37.2916178,
      maxLat: 37.2916178,
      minLng: 126.9756831,
      maxLng: 126.9756831,
    },
    {
      label: '주차장',
      value: 'Building F',
      minLat: 37.292695,
      maxLat: 37.292695,
      minLng: 126.976759,
      maxLng: 126.976759,
    },
    {
      label: '약학대학',
      value: 'Building G',
      minLat: 37.29206,
      maxLat: 37.29206,
      minLng: 126.9767,
      maxLng: 126.9767,
    },
    {
      label: '반도체관',
      value: 'Building H',
      minLat: 37.29161,
      maxLat: 37.29161,
      minLng: 126.9777,
      maxLng: 126.9777,
    },
    {
      label: '체육관',
      value: 'Building I',
      minLat: 37.2924,
      maxLat: 37.2924,
      minLng: 126.9705,
      maxLng: 126.9705,
    },
    {
      label: '대운동장',
      value: 'Building J',
      minLat: 37.29505,
      maxLat: 37.29505,
      minLng: 126.9709,
      maxLng: 126.9709,
    },
  ];

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '위치 권한',
          message: '이 앱은 사용자의 위치를 사용합니다.',
          buttonNeutral: '나중에',
          buttonNegative: '거부',
          buttonPositive: '허용',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('위치 권한이 허용되었습니다.');
      } else {
        console.log('위치 권한이 거부되었습니다.');
      }
    } catch (err) {
      console.log(err);
      console.warn(err);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const watchId = Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          console.log(latitude, longitude);
          const transformLatitude = Number(latitude);
          const transformLongitude = Number(longitude);
          setLatitude(transformLatitude);
          setLongitude(transformLongitude);
          //Alert.alert(
          //  '현재 위치',
          //  `위도: ${transformLatitude}, 경도: ${transformLongitude} 설정되었습니다.`
          //);
        },
        error => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 1,
        },
      );
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('위치 오류', '위치를 가져오는 데 실패했습니다.');
    }
  };

  const handleLatitudeChange = lat => {
    setTempLatitude(lat);
  };

  const handleLongitudeChange = lng => {
    setTempLongitude(lng);
  };

  const handleDialogConfirm = () => {
    const numericLat = parseFloat(tempLatitude);
    const numericLng = parseFloat(tempLongitude);

    if (isNaN(numericLat) || isNaN(numericLng)) {
      Alert.alert(
        'Invalid Input',
        'Please enter valid latitude and longitude.',
      );
      return;
    }

    // Find exact matches
    const exactMatches = buildingRanges.filter(building => {
      return (
        numericLat >= building.minLat &&
        numericLat <= building.maxLat &&
        numericLng >= building.minLng &&
        numericLng <= building.maxLng
      );
    });

    // If there are exact matches, show them
    if (exactMatches.length > 0) {
      setMatchingLocations(exactMatches);
    } else {
      // If no exact matches, find the closest locations
      const closestMatches = findClosestLocations(numericLat, numericLng);

      // Combine exact matches and closest matches
      const combinedMatches = [...exactMatches, ...closestMatches];

      // Show top 3 matches (exact matches first)
      setMatchingLocations(combinedMatches.slice(0, 3));
    }

    //setDialogVisible(false);
  };

  const findClosestLocations = (lat, lng) => {
    // Sort by distance to the given coordinates
    const locationsWithDistance = buildingRanges.map(building => {
      const distance = calculateDistance(
        lat,
        lng,
        (building.minLat + building.maxLat) / 2,
        (building.minLng + building.maxLng) / 2,
      );
      return {...building, distance};
    });

    // Sort locations by distance (ascending)
    locationsWithDistance.sort((a, b) => a.distance - b.distance);

    // Return the closest 3 locations (or fewer if less than 3)
    return locationsWithDistance.slice(0, 3);
  };

  // Function to calculate distance between two points (in km)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const handleOtherLocation = () => {
    setDialogVisible(true); // Open the dialog to manually enter coordinates
  };

  const handleBuildingSelection = building => {
    setSelectedBuilding(building);
    setDialogVisible(false);
  };

  const handlePostSubmit = async () => {
    try {
      if (latitude === null || longitude === null) {
        Alert.alert('위치 오류', '현재 위치를 선택해주세요.');
      }
      if (title && body) {
        await uploadPost(
          title,
          body,
          12,
          new db.GeoPoint(latitude || 0, longitude || 0),
          false,
        );
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
        }}>
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
              alignItems: 'center',
            }}>
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
        }}>
        <Button title="현재 위치" onPress={getCurrentLocation} />
        <Button title="다른 위치" onPress={handleOtherLocation} />
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
          style={[styles.input, {height: 300}]}
          placeholder="내용을 입력하세요."
          value={body}
          onChangeText={setBody}
          multiline
        />
      </View>
      <View>
        <Text>위도: {latitude}</Text>
        <Text>경도: {longitude}</Text>
      </View>
      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>위치 선택</Dialog.Title>
        {buildingRanges.map((building, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setLatitude((building.minLat + building.maxLat) / 2);
              setLongitude((building.minLng + building.maxLng) / 2);
              setDialogVisible(false);
            }}>
            <Text>{building.label}</Text>
          </TouchableOpacity>
        ))}
        <Dialog.Button label="Cancel" onPress={() => setDialogVisible(false)} />
      </Dialog.Container>
    </View>
  );
}

export default Write;
