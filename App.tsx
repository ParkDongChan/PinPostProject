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
import {
  NavigationContainer,
  useNavigationContainerRef,
  CommonActions,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from './src/pages/SignUp';
import Setting from './src/pages/Setting';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

type NavParamList = {
  Landing: undefined;
  Main: undefined;
  SignUp: undefined;
};

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
  const Stack = createNativeStackNavigator<NavParamList>();
  const navigationRef = useNavigationContainerRef<NavParamList>();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (!user) {
        navigationRef.current?.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Landing'}], //스택 초기화하고 "Landing" 페이지로 이동
          }),
        );
      }
    });
    return subscriber;
  }, []);

  useEffect(() => {
    if (auth().currentUser) {
      navigationRef.navigate('Main');
    }
  });
  //*************앱 켤때마다 로그아웃 시켜서 로그인 테스트용************///
  /*
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
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="Landing"
          options={{headerShown: false}}
          component={Login}
        />
        <Stack.Screen
          name="Main"
          options={{headerShown: false}}
          children={({navigation}) => <Main_map navigation={navigation} />}
        />
        <Stack.Screen
          name="SignUp"
          options={{headerShown: false}}
          component={SignUp}
        />
        <Stack.Screen
          name="Setting"
          options={{headerShown: false}}
          component={Setting}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
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
