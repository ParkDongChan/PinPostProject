/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NaverMapView} from '@mj-studio/react-native-naver-map';
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
import auth from '@react-native-firebase/auth';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function Main_map({navigation}: Props): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const initialLocation = {
    latitude: 37.291175,
    longitude: 126.968310,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}>
        <Image source={require('../components/BackPage.jpg')} style={styles.back_logo} />
      </TouchableOpacity>
      <NaverMapView
        style={{flex: 1}}
        initialRegion={{
          ...initialLocation,
        }}
      />
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
