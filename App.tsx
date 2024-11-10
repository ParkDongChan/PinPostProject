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
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import Login from './src/pages/Login';
import Main_map from './src/pages/Main_map';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './src/pages/SignUp';

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

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [user, setUser] = useState();

  const Stack = createNativeStackNavigator<NavParamList>();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function onAuthStateChanged(user: any) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);

  //*************앱 켤때마다 로그아웃 시켜서 로그인 테스트용************///

  useEffect(() => {
    GoogleSignin.revokeAccess();
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out successfully');
      })
      .catch(error => {
        console.error('Sign-out error:', error);
      });
  }, []);
  //************************************************************/ //

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Landing" options={{headerShown: false}} component={Login} />
        <Stack.Screen name="Main" options={{headerShown: false}} component={Main_map} />
        <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  //return (
  //  <View style={{flex: 1}}>
  //    {user ? <NaverMapView style={{flex: 1}} /> : <LoginScreen />}
  //  </View>
  //);
  //return (
  //  <View style={{flex: 1}}>
  //    <NaverMapView style={{flex: 1}} />
  //  </View>
  //);
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
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

//<SafeAreaView style={backgroundStyle}>
//    <StatusBar
//      barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//      backgroundColor={backgroundStyle.backgroundColor}
//    />
//    <ScrollView
//      contentInsetAdjustmentBehavior="automatic"
//      style={backgroundStyle}>
//      <Header />
//      <View
//        style={{
//          backgroundColor: isDarkMode ? Colors.black : Colors.white,
//        }}>
//        <Section title="Step One">
//          Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//          screen and then come back to see your edits.
//        </Section>
//        <Section title="See Your Changes">
//          <ReloadInstructions />
//        </Section>
//        <Section title="Debug">
//          <DebugInstructions />
//        </Section>
//        <Section title="Learn More">
//          Read the docs to discover what to do next:
//        </Section>
//        <LearnMoreLinks />
//      </View>
//    </ScrollView>
//  </SafeAreaView>
// 테스트

export default App;
