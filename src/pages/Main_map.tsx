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
import React, {useState, useEffect, useRef} from 'react';
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
  FlatList,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
import {Post, Comment, getComments, getPosts, uploadComment, uploadPost} from '../backend';
import db, { onSnapshot } from '@react-native-firebase/firestore';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function Main_map({navigation}: Props): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const bottomSheetRef = useRef<BottomSheet>(null);

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

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchPosts();
    }, [])
  );


  useEffect(() => {
    if (selectedPost) {
      const fetchComments = async () => {
        try {
          bottomSheetRef.current?.snapToPosition('38%');
          console.log(bottomSheetRef.current);
          const data = await getComments(selectedPost.id);
          const formattedComments = data.map((comment) => ({
            ...comment,
            timestamp: comment.timestamp,
          }));
          setComments(formattedComments);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };

      fetchComments();
    }
  }, [selectedPost]);

  const handleMarkerPress = (marker: Post) => {
    setSelectedPost(marker);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{position: 'absolute', top: 20, left: 20, zIndex: 1}}>
          <Image
            source={require('../components/BackPage.jpg')}
            style={styles.back_logo}
          />
        </TouchableOpacity>
        <NaverMapView
          style={{flex: 1}}
          initialRegion={{
            ...initialLocation,
          }}
        >
          {posts.map((marker, index) => {
            return (
              <NaverMapMarkerOverlay
                key={index}
                latitude={marker.location.latitude}
                longitude={marker.location.longitude}
                onTap={() => handleMarkerPress(marker)}
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

        <BottomSheet
          ref={bottomSheetRef}
          style={styles.bottomSheet}
        >
          {selectedPost ? (
            <BottomSheetView style={styles.selectedPostContainer}>
              <View style={styles.postHeader}>
                <Image source={require('../components/Anonymous.png')} style={styles.userIcon} />
                <View style={styles.postHeaderText}>
                  <Text style={styles.selectedPostAuthor}>{selectedPost.author.nickname}</Text>
                  <Text style={styles.selectedPostTimestamp}>{new Date(selectedPost.timestamp).toLocaleString()}</Text>
                </View>
              </View>
              <Text style={styles.selectedPostTitle}>{selectedPost.title}</Text>
              <Text style={styles.selectedPostBody}>{selectedPost.body}</Text>
              <View style={styles.postReactions}>
                <Image source={require('../components/Thumbs_Up.png')} style={styles.postReactionIcon} />
                <Text style={styles.likeCount}>{selectedPost.likes}</Text>
                <Image source={require('../components/Comment.png')} style={styles.postReactionIcon} />
                <Text style={styles.commentCount}>{comments.length}</Text>
              </View>
              <FlatList
                data={comments}
                keyExtractor={(item, idx) => idx.toString()}
                renderItem={({ item }) => (
                  <View style={styles.commentItem}>
                    <View style={styles.commentHeader}>
                      <Image source={require('../components/Anonymous.png')} style={styles.commentUserIcon} />
                      <Text style={styles.commentAuthor}>{item.author}</Text>
                      <Text style={styles.commentDate}>{item.timestamp.toLocaleString()}</Text>
                    </View>
                    <Text style={styles.commentText}>{item.text}</Text>
                  </View>
                )}
              />
            </BottomSheetView>
          ) : (
            <Text style={styles.noPostSelectedText}>마커를 눌러 게시글을 확인하세요</Text>
          )}
        </BottomSheet>


        <View style={styles.bottomBar}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CommunitySearch')}
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
            onPress={() => navigation.navigate('Write')}
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
    </GestureHandlerRootView>
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
  bottomSheet: {
    backgroundColor: '#f9f9f9', 
    borderTopLeftRadius: 16, 
    borderTopRightRadius: 16, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, 
    shadowRadius: 4,
    elevation: 10, 
  },
  selectedPostContainer: {
    padding: 16, 
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  postHeaderText: {
    flexDirection: 'column',
  },
  selectedPostTitle: {
    fontSize: 20, 
    fontWeight: '700',
    marginBottom: 10,
  },
  selectedPostBody: {
    fontSize: 16,
    marginBottom: 15, 
  },
  selectedPostAuthor: {
    fontSize: 14,
    color: '#555',
  },
  selectedPostTimestamp: {
    fontSize: 12,
    color: '#999',
  },
  postReactions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  postReactionIcon:{
    width: 24,
    height: 24,
    marginRight: 10,
  },
  likeCount: {
    marginRight: 20,
    fontSize: 18,
    color: '#f00',
  },
  commentCount: {
    marginBottom: 22,
    fontSize: 18,
    color: '#004EA2',
  },
  commentItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentUserIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  commentAuthor: {
    fontWeight: '600',
    marginRight: 8,
  },
  commentDate: {
    fontSize: 12,
    color: '#888',
  },
  commentText: {
    marginTop: 4, 
  },
  noPostSelectedText: {
    padding: 16, 
    textAlign: 'center',
    color: '#aaa',
  },
});

export default Main_map;