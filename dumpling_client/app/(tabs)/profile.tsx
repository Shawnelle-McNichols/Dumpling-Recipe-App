import React, { useState, useEffect } from 'react';
import { Alert, Image, Platform, View, Text } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import styles from "../../styles/styles";
import { Link, useRouter } from 'expo-router';
import { auth, db } from "../../scripts/firebaseConfig.mjs";
import { ref, get } from "firebase/database";

const profImg = require("../../assets/images/profileimg.png");


export default function ProfileScreen() {
  const [username, setUsername] = useState<string>("");
  const [favCuisines, setFavCuisines] = useState<string[]>([]);
  const [myDiet, setMyDiet] = useState<string[]>([]);
  const [favDishes, setFavDishes] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = ref(db, `users/${user.uid}`);
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            const data = snapshot.val();

            setUsername(data.username || "");
            setFavCuisines(data.favCuisines || []);
            setMyDiet(data.myDiet || []);
            setFavDishes(data.favDishes || []);
            setAllergies(data.allergies || []);
          } else {
            Alert.alert("User needs to set up their profile.");
          }
        } catch (error) {
          Alert.alert("Error fetching user data");
        }
      } else {
        Alert.alert("No user signed in");
      }
    }
    fetchUserData();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#ffffff', dark: '#353636' }}
      headerImage={
        <View>
          <Image
            source={require('@/assets/images/react-logo.png')}
            style={styles.reactLogo}
          />
          <ThemedView style={styles.divider} />
        </View>
      }>
      <View style={styles.container2}>
        <Image source={profImg} />
      </View >
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.header}>Welcome, {username} </ThemedText>
      </ThemedView>
      <View><Text style={styles.blacktext}>Let's have a look at your profile!</Text></View>

      <View style={styles.view}>
        <ThemedText style={styles.subtitle}>Allergies</ThemedText>
        {allergies.length > 0 ? (
          allergies.map((allergy, index) => (
            <Text style={styles.blacktext} key={index}>{allergy}</Text>
          ))
        ) : (
          <Text>None</Text>
        )}
      </View>
      <View style={styles.view}>
        <Text style={styles.subtitle}>Diet</Text>
        {myDiet.length > 0 ? (
          myDiet.map((diet, index) => (
            <Text style={styles.blacktext} key={index}>{diet}</Text>
          ))
        ) : (
          <Text>None</Text>
        )}
      </View>

      <View style={styles.view}>
        <Text style={styles.subtitle}>Favourite Cuisines</Text>
        {favCuisines.length > 0 ? (
          favCuisines.map((cuisine, index) => (
            <Text style={styles.blacktext} key={index}>{cuisine}</Text>
          ))
        ) : (
          <Text>None</Text>
        )}
      </View>

      <View style={styles.view}>
        <Text style={styles.subtitle}>Favourite Dishes</Text>
        {favDishes.length > 0 ? (
          favDishes.map((dish, index) => (
            <Text style={styles.blacktext} key={index}>{dish}</Text>
          ))
        ) : (
          <Text>None</Text>
        )}
      </View>
      <View style={styles.view} >
      <Link href="../../forms/editprofile"><Text style={styles.colorfont}>Edit profile</Text></Link>
      <Text style={styles.colorfont}>Logout</Text>
      </View>   
    </ParallaxScrollView>
  );
}

