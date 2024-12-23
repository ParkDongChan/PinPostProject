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
import { useFocusEffect } from '@react-navigation/native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    backgroundColor: '#fff',
    position: 'relative',
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
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
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

function Community({navigation}: Props) {

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchPosts();
    }, [])
  );

  console.log(posts);

  return (
    <View style={styles.loginContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{position: 'absolute', top: 25, left: 20, zIndex: 1}}>
        <Image
          source={require('../components/BackPage.jpg')}
          style={styles.back_logo}
        />
      </TouchableOpacity>
      <Text style={styles.boardTitle}>게시판</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Write")}
        style={{position: 'absolute', top: 25, right: 20, zIndex: 1}}>
        <Image
          source={require('../components/Pencil.jpg')}
          style={styles.back_logo}
        />
      </TouchableOpacity>
      <View
        style={{
          height: 1,
          backgroundColor: '#B0AFAF',
          width: '100%',
          marginTop: 50,
        }}
      />
      <ScrollView contentContainerStyle={{paddingRight: 5}}>
      {posts.map((post, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate("Post", { post })}
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginVertical: 10,
            paddingTop: 15,
            gap: 10,
        }}>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'left',
              fontWeight: 'bold',
              flexShrink: 1,
              color: '#000000',
            }}
          >
            {post.title}
          </Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'left',
              flexShrink: 1,
              color: '#000000',
            }}
          >
            {post.body}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
          }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
                gap: 10,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                }}
              >
                <Image
                  source={require('../components/Thumbs_Up.png')}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
                <Text style={{color: "#FF0000"}}>{post.likes}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                }}
              >
                <Image
                  source={require('../components/Comment.png')}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
                 <Text style={{color: "#0021F5"}}>{post.comments.length || 0}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}
            >
              <Text>
                {post.timestamp
                  ? new Date(post.timestamp).toLocaleString('en-GB', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: false, // 24시간 형식
                    }).replace(',', '') // ',' 제거
                  : 'No Timestamp'}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: '#B0AFAF',
              width: '100%',
            }}
          />
        </TouchableOpacity>
      ))}
      </ScrollView>
    </View>
  );
}

export default Community;
