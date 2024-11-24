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
import {getComments, getPosts, uploadComment, uploadPost} from '../backend';

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
    //alignSelf: 'center',
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

  const [posts, setPosts] = useState([]);

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
          onPress={() => navigation.goBack()}
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
    </View>
  );
}

export default Write;
