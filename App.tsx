/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NaverMapView } from '@mj-studio/react-native-naver-map';
import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={{flex: 1}}>
      {isLoggedIn ? (
        <NaverMapView style={{ flex: 1 }} />
      ) : (
        <LoginScreen onLogin={() => setIsLoggedIn(true)} />
      )}
    </View>
  );
  //return (
  //  <View style={{flex: 1}}>
  //    <NaverMapView style={{flex: 1}} />
  //  </View>
  //);
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={stylesLogin.loginContainer}>
      <Text style={stylesLogin.title}>로그인</Text>
      <TextInput
        style={stylesLogin.input}
        placeholder="아이디"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={stylesLogin.input}
        placeholder="비밀번호"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity style={stylesLogin.button} onPress={onLogin}>
        <Text style={stylesLogin.buttonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const stylesLogin = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

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
