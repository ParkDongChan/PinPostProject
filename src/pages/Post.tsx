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
  CheckBox,
} from 'react-native';
import {getComments, getPosts, uploadComment, uploadPost} from '../backend';
import { useFocusEffect } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export interface UserData {
  name: string;
  email: string;
  nickname: string;
}

export interface Comment {
  author: string;
  text: string;
  timestamp: Date;
}

export interface Post {
  author: UserData;
  id: string;
  title: string;
  body: string;
  photoUrl: string;
  likedUsers: string[];
  likes: number;
  building_id: number;
  timestamp: Date;
  location: GeoPoint;
  comments: Comment[];
}

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
  image_profile: {
    width: 50,
    height: 50,
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
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  commentButton: {
    marginLeft: 10,
    backgroundColor: '#7AE270',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  commentButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  checkbox: {
    marginRight: 5,
  },
  checkboxLabel: {
    fontSize: 16,
  },
});

function Post({ navigation, route }: { navigation: any; route: any }) {
  const { post } = route.params;

  const [onePost, setOnePost] = useState<Post>();
  const [comment, setComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      const now_data = data.find((p: any) => p.id === post.id);
      setOnePost(now_data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const likePost = async () => {
    try {
      const postRef = db().collection('posts').doc(post.id);
      await postRef.update({
        likes: db.FieldValue.increment(1),
      });
      fetchPosts();
    } catch (error) {
      console.error("Error liking post: ", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (comment.trim() === '') return;
    try {
      await uploadComment(post.id, comment, isAnonymous);
      setComment('');
      fetchPosts();
    } catch (error) {
      console.error('Error uploading comment:', error);
    }
  };

  useEffect(() => {
    setOnePost(post);
  }, []);

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
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          marginVertical: 10,
          paddingTop: 50,
          gap: 10,
      }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}
        >
          <View>
            <Image
              source={require('../components/Anonymous.png')}
              style={styles.image_profile}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 20,
                textAlign: 'left',
                fontWeight: 'bold',
                flexShrink: 1,
                color: '#000000',
              }}
            >
              {onePost?.author?.nickname}
            </Text>
            <Text
              style={{
                fontSize: 16,
                textAlign: 'left',
                flexShrink: 1,
                color: '#000000',
              }}
            >
              {onePost?.timestamp
                ? new Date(onePost?.timestamp).toLocaleString('en-GB', {
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
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingTop: 10,
            gap: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: 'left',
              fontWeight: 'bold',
              flexShrink: 1,
              color: '#000000',
            }}
          >
            {onePost?.title}
          </Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'left',
              flexShrink: 1,
              color: '#000000',
            }}
          >
            {onePost?.body}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
              gap: 10,
            }}
          >
            <TouchableOpacity
              onPress={likePost}
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
              <Text style={{color: "#FF0000"}}>{onePost?.likes}</Text>
            </TouchableOpacity>
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
               <Text style={{color: "#0021F5"}}>{onePost?.comments?.length || 0}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: '#B0AFAF',
            width: '100%',
          }}
        />
        <ScrollView contentContainerStyle={{paddingRight: 5}}>
        {onePost && onePost?.comments?.map((comment, index) => (
          <View
            key={index}
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
              {comment.text}
            </Text>
            <View
              style={{
                height: 1,
                backgroundColor: '#B0AFAF',
                width: '100%',
              }}
            />
          </View>
        ))}
        </ScrollView>
        <View style={styles.commentInputContainer}>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={isAnonymous}
              onValueChange={setIsAnonymous}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxLabel}>익명</Text>
          </View>
          <TextInput
            style={styles.commentInput}
            value={comment}
            onChangeText={setComment}
            placeholder="댓글을 입력하세요"
          />
          <TouchableOpacity style={styles.commentButton} onPress={handleCommentSubmit}>
            <Text style={styles.commentButtonText}>댓글 달기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Post;
