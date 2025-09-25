// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import Login from "./login/Login";
import Signin from "./login/Signin";

import Home from "./main/Home";
import Profile from "./profile/ProfileScreen";
import History from "./profile/History";

import Feed from "./main/findteam/Feed";
import CreateAnnouncement from "./main/findteam/CreateAnnouncement";

import ChatRoom from "./main/chat/ChatRoom";

import SFootball from "./main/stadium/S-Football";
import SBasketball from "./main/stadium/S-Basketball";
import SBadminton from "./main/stadium/S-Badminton";

import Detail from "./main/stadium/Detail/Detail";
import ScheduleScreen from "./main/stadium/Detail/ScheduleScreen";

import MatchScreen from "./main/MatchScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
     <ActionSheetProvider>
       <NavigationContainer>
         <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Feed" component={Feed} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="CreateAnnouncement" component={CreateAnnouncement} />
          <Stack.Screen name="ChatRoom" component={ChatRoom} />
          <Stack.Screen name="StadiumFootball" component={SFootball} />
          <Stack.Screen name="StadiumBasketball" component={SBasketball} />
          <Stack.Screen name="StadiumBadminton" component={SBadminton} />
          <Stack.Screen name="Detail" component={Detail} />
          <Stack.Screen name="Schedule" component={ScheduleScreen} />
          <Stack.Screen name="MatchScreen" component={MatchScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ActionSheetProvider>
  );
}
