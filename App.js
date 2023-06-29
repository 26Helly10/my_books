import React,{useState, useEffect } from 'react';
import "react-native-gesture-handler";
import { StyleSheet, Text, View } from 'react-native';
import Navigation from "./navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Auth/Login";
import { onAuthStateChanged } from "firebase/auth";
import { FirebareAuth } from "./FirebaseConfig";

const Stack =createNativeStackNavigator();

export default function App() {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FirebareAuth, (user) => {
      console.log('user', user );
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen name="Navigation" component={Navigation}  options={{headerShown:false}}/>
        ) : (
          <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
          )
          }

      </Stack.Navigator>
    </NavigationContainer>
  );
}


       // <Navigation/>