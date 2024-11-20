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
import {getComments} from '../backend';

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
});

export default Main_map;
