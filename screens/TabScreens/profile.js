import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FirebareAuth, FirestoreDB } from '../../FirebaseConfig';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const Profile = () => {
  const [loggedOut, setLoggedOut] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const fadeOutOpacity = useSharedValue(1);

  useEffect(() => {
    const user = FirebareAuth.currentUser;
    if (user) {
      setUserEmail(user.email);
    }
  }, []);


  const handleSignOut = async () => {
    try {
      await FirebareAuth.signOut();
      fadeOutOpacity.value = withTiming(0, {
        duration: 500,
        easing: Easing.ease,
      }).start(() => {
        setLoggedOut(true);
      });
    } catch (error) {
      // Handle errors
      console.log(error);
    }
  };

  const fadeOutStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeOutOpacity.value,
    };
  });

  if (loggedOut) {
    return (
      <Animated.View style={[styles.container, fadeOutStyle]}>
        <Text style={styles.heading}>Logged Out</Text>
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>

      <Text style={styles.emailText}>Email: {userEmail}</Text>

      {/* Sign Out */}
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#654E92',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
