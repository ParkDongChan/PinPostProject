/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  NaverMapMarkerOverlay,
  NaverMapView,
} from '@mj-studio/react-native-naver-map';
import React, {useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  AppState,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {CommonActions} from '@react-navigation/native';
import {Comment, getComments} from '../backend';

function Main_map({navigation}: Props): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  /***********getComments() 테스트용************/
  getComments('6VFaoWXfv2m2aHDasMrY');

  const initialLocation = {
    latitude: 37.291175,
    longitude: 126.96831,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const markers = [
    {
      latitude: 37.291175,
      longitude: 126.96831,
      title: 'Initial Marker',
    },
  ];
  const [clickedLocation, setClickedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const handleMapClick = async (event: { latitude: number; longitude: number }) => {
    setClickedLocation({
      latitude: event.latitude,
      longitude: event.longitude,
    });
    setComments(await getComments('6VFaoWXfv2m2aHDasMrY'));
    setModalVisible(true); 
  };

  useEffect(() => {
    if (navigation.getState().routes.length > 1) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Main'}],
        }),
      );
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{position: 'absolute', top: 20, left: 20, zIndex: 1}}>
        <Image
          source={require('../components/BackPage.jpg')}
          style={styles.back_logo}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Setting')}
        style={{position: 'absolute', top: 20, left: 80, zIndex: 1}}>
        <Image
          source={require('../components/Setting.png')}
          style={styles.setting}
        />
      </TouchableOpacity>
      <NaverMapView
        style={{flex: 1}}
        initialRegion={{
          ...initialLocation,
        }}
        onTapMap={(event) => {
          // 터치 이벤트로 좌표 가져오기
          const latitude = event.latitude;
          const longitude = event.longitude;
          handleMapClick({ latitude, longitude });
        }}
      />
      {markers.map((marker, index) => (
        <NaverMapMarkerOverlay
          key={index}
          latitude={marker.latitude}
          longitude={marker.longitude}
          width={50}
          height={50}
          caption={{
            text: marker.title,
          }}
          image={{httpUri: 'https://ifh.cc/g/3cLLQa.jpg'}}
        />
      ))}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)} // 뒤로가기 시 모달 닫기
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Clicked Location</Text>
            {clickedLocation && (
              <>
                <Text style={styles.modalText}>
                  Latitude: {clickedLocation.latitude.toFixed(6)}
                </Text>
                <Text style={styles.modalText}>
                  Longitude: {clickedLocation.longitude.toFixed(6)}
                </Text>
                <Text style={styles.modalText}>
                {comments.length > 0 ? comments.map((comment, index) => 
                  `- ${comment.author}: ${comment.text} (${new Date(comment.timestamp).toLocaleString()})\n`).join('')
                  : 'No comments available.'}
                </Text>
              </>
            )}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  back_logo: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  setting: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    fontSize: 16,
    color: 'blue',
    marginTop: 20,
  },
});

export default Main_map;
