import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getPosts } from '../backend';

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    backgroundColor: '#fff',
    position: 'relative',
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
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 50,
  },
});

function CommunitySearch({navigation}: Props) {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');

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

  // 검색된 게시물 필터링
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.loginContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ position: 'absolute', top: 25, left: 20, zIndex: 1 }}>
        <Image
          source={require('../components/BackPage.jpg')}
          style={styles.back_logo}
        />
      </TouchableOpacity>
      <Text style={styles.boardTitle}>게시판</Text>
      <TextInput
        style={styles.input}
        placeholder="제목으로 검색"
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />
      <ScrollView contentContainerStyle={{ paddingRight: 5 }}>
        {filteredPosts.map((post, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('Post', { post })}
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
              }}>
              {post.title}
            </Text>
            <Text
              style={{
                fontSize: 16,
                textAlign: 'left',
                flexShrink: 1,
                color: '#000000',
              }}>
              {post.body}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <Text>
                {post.timestamp
                  ? new Date(post.timestamp).toLocaleString('en-GB', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: false,
                    }).replace(',', '')
                  : 'No Timestamp'}
              </Text>
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

export default CommunitySearch;
