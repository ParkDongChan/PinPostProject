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
import {getComments, getPosts, uploadComment, uploadPost} from '../backend';
import db from '@react-native-firebase/firestore';

function Main_map({navigation}: Props): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [posts, setPosts] = useState([]);

  /***********getComments() 테스트용************/
  /*
  getComments('liTHY40JGiQlB0St88Pj').then(comment => {
    console.log(comment);
  });
  //*************************************/

  /***********getPosts() 테스트용************/
  /*
  getPosts().then(posts => {
    console.log(posts);
  });
  //*************************************/

  /***********uploadComment() 테스트용************/
  //uploadComment('liTHY40JGiQlB0St88Pj', '서버시간 사용 테스트', false);
  //*************************************/

  /***********uploadPost() 테스트용************/
  /*
  uploadPost(
    '서버시간 사용 테스트',
    '테스트여유',
    12,
    new db.GeoPoint(37.5665, 126.978),
    false,
  );
  //*************************************/

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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  console.log(posts);

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
      >
        {posts.map((marker, index) => {
          console.log(marker.location);
          return (
            <NaverMapMarkerOverlay
              key={index}
              latitude={marker.location.latitude}
              longitude={marker.location.longitude}
              width={50}
              height={50}
              caption={{
                text: marker.title,
                textSize: 13,
                color: '#000',
              }}
              image={require('../components/Location.png')}
            />
          )
        })}
      </NaverMapView>
      <View style={styles.bottomBar}>
        <TouchableOpacity
          //onPress={() => navigation.navigate('Setting')}
          style={styles.bottomButton}
        >
          <Image
            source={require('../components/Search.jpg')}
            style={styles.bottom_setting}
          />
          <Text style={styles.bottomText}>검색</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Community')}
          style={styles.bottomButton}
        >
          <Image
            source={require('../components/MapMarker.jpg')}
            style={styles.bottom_setting}
          />
          <Text style={styles.bottomText}>커뮤니티</Text>
        </TouchableOpacity>
        <TouchableOpacity
          //onPress={() => navigation.navigate('Setting')}
          style={styles.bottomButton}
        >
          <Image
            source={require('../components/Pencil.jpg')}
            style={styles.bottom_setting}
          />
          <Text style={styles.bottomText}>글쓰기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => navigation.navigate('Setting')}
        >
          <Image
            source={require('../components/Setting.png')}
            style={styles.bottom_setting}
          />
          <Text style={styles.bottomText}>내 정보</Text>
        </TouchableOpacity>
      </View>
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
  bottom_setting: {
    width: 40,
    height: 40,
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
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  bottomButton: {
    flex: 1,
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 14,
    color: '#333',
  },
});

export default Main_map;
