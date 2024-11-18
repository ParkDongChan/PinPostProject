import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';
import {
  GoogleSignin,
  statusCodes,
  isErrorWithCode,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {Alert} from 'react-native';

export interface UserData {
  name: string;
  email: string;
  nickname: string;
}

export const isNewUser = async (uid: string): Promise<boolean> => {
  try {
    const userDoc = await db().collection('users').doc(uid).get();
    return !userDoc.exists;
  } catch (error) {
    console.error(error);
  }
  return true;
};

export const initialGoogleLogin = () => {
  GoogleSignin.configure({
    webClientId:
      '215594584032-mj6lq9omiq8dm80ustqqanmoe45iljsp.apps.googleusercontent.com',
  });
};

export const GoogleLogin = async (navigation: Props) => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    if (response.type === 'success') {
      if (response.data.user.email.endsWith('@g.skku.edu')) {
        //이메일 도메인 확인
        const googleCredential = auth.GoogleAuthProvider.credential(
          response.data.idToken,
        );
        const res = await auth().signInWithCredential(googleCredential);
        isNewUser(res.user.uid).then(result => {
          //가입인지 로그인인지 확인
          if (result) {
            navigation.navigate('SignUp');
            console.log('new');
          } else {
            navigation.replace('Main');
            console.log('already signed');
          }
        });
      } else {
        //SKKU 메일이 아닐경우
        Alert.alert('Alert', "It's not a SKKU email. Please use g.skku.edu", [
          {text: '확인'},
        ]);
        try {
          await GoogleSignin.revokeAccess();
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      //구글 로그인 실패
      console.log('cancelled by user');
    }
  } catch (error) {
    console.error(error);
  }
};

export const handleSignUp = async (
  name: string,
  email: string,
  nickname: string,
  navigation: Props,
) => {
  const uid = auth().currentUser?.uid;
  if (!uid) {
    console.error('User is not logged in');
    return;
  }

  try {
    await db().collection('users').doc(uid).set({
      name: name,
      nickname: nickname,
      email: email,
    });
    navigation.replace('Main');
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getUserInfo = async (): Promise<UserData | null> => {
  const currentUser = auth().currentUser;
  if (!currentUser) {
    //로그인 되어있지 않을 경우 null 반환
    return null;
  }
  try {
    //user 컬렉션에서 문서 찾기
    const userDoc = await db().collection('users').doc(currentUser.uid).get();

    if (userDoc.exists) {
      //문서가 존재하면 데이터를 반환
      console.log(userDoc.data() as UserData);
      return userDoc.data() as UserData;
    } else {
      console.error('User document does not exist in Firestore.');
    }
  } catch (error) {
    console.error('Error fetching user document:', error);
  }
  return null;
};
