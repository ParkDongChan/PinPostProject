# 📌 PinPost  

TEAM2 (Introduction to Software Engineering / SWE3002_42 / 2024F)  

---

## 🛠️ Project Overview  

**PinPost** is a location-based community app designed for campus communities. It allows users to discover and share updates, events, and discussions based on specific locations. The app combines intuitive user interfaces with real-time location-based services to enhance campus communication.  

---

## 👥 Team Members  

- **Team Leader**: 정민재 ([mjayJeong](https://github.com/mjayJeong))
- **Frontend Developers**: 
  - 김준섭 ([joonseop](https://github.com/joonseop))
  - 박동찬 ([ParkDongChan](https://github.com/ParkDongChan))
  - 샤히라 ([syahirah1203](https://github.com/syahirah1203))
- **Backend Developers**: 
  - 김우주 ([w0uldy0u](https://github.com/w0uldy0u))
  - 백지윤 ([jiyooniboon](https://github.com/jiyooniboon))
  - 이호준 ([orcies8147](https://github.com/orcies8147))
---

## 🗓️ Development Period

2024.09 ~ 2024.12 

---

## ✨ Features  

### 1. User Authentication
- **Login**: Simple and secure login using school email addresses (@g.skku.edu)
- **Registration**: Easy user registration with validation for school email domains.

### 2. Location-Based Posting
- **Main Map**: View posts tied to specific locations on a campus map.
- **Write Posts**:
  - Posts can be tied to the user’s current GPS location.
  - Users can also manually select a location to associate with their post.
- **Commenting**: Comment on posts and view other users' comments.

### 3. Community Interaction
- Users can engage in conversations by liking posts or leaving comments.
- Anonymous posting for added privacy.

### 4. Real-Time Updates
- See posts updated dynamically on the map as you zoom or swipe.
- Easily locate nearby events or announcements.

---

## 🔨 Tech Stack  

### Frontend  
- ![Figma](https://img.shields.io/badge/-Figma-F24E1E?logo=figma&logoColor=white&style=flat)  
  For designing and prototyping UI/UX.
- ![React Native](https://img.shields.io/badge/-React%20Native-61DAFB?logo=react&logoColor=white&style=flat)  
  Cross-platform mobile development.  
- ![Naver Map API](https://img.shields.io/badge/-Naver%20Map%20API-03C75A?logo=naver&logoColor=white&style=flat)  
  Provides interactive and location-based map features.  

### Backend  
- ![Firebase Authentication](https://img.shields.io/badge/-Firebase%20Authentication-FFCA28?logo=firebase&logoColor=white&style=flat)  
  For user login and authentication.  
- ![Firebase Firestore](https://img.shields.io/badge/-Firebase%20Firestore-FFCA28?logo=firebase&logoColor=white&style=flat)  
  For real-time data storage and updates.  

---

## 🧰 Prerequisites  

- **Node.js** (v20.15.1) and **npm** (v10.7.0)  
- **Android Studio** with API Level 35 (Google Play)  
- **JDK 17**  
- **Android SDK** (v34)  
- **Kotlin** (v1.9.24)  
- **React** (v18.3.1)  
- **React Native** (v0.75.4)  
- **react-native-firebase/app** (v21.2.0)  
- **react-native-naver-map** (v2.2.0)  

---

## 🚀 Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# install packages
npm install

# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio respectively.
