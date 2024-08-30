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
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome, {username} </ThemedText>
      </ThemedView>
      <Text>Let have a look at your profile!</Text>

      <View>
        <ThemedText>Allergies</ThemedText>
        {allergies.length > 0 ? (
          allergies.map((allergy,index) => (
            <Text key={index}>{allergy}</Text>
          ))
        ): (
          <Text>None</Text>
        )}
      </View>

      <View>
        <Text>Diet</Text>
        {myDiet.length > 0 ? (
          myDiet.map((diet,index) => (
            <Text key={index}>{diet}</Text>
          ))
        ): (
          <Text>None</Text>
        )}
      </View>

      <View>
        <Text>Favourite Cuisines</Text>
        {favCuisines.length > 0 ? (
          favCuisines.map((cuisine,index) => (
            <Text key={index}>{cuisine}</Text>
          ))
        ): (
          <Text>None</Text>
        )}
      </View>

      <View>
        <Text>Favourite Dishes</Text>
        {favDishes.length > 0 ? (
          favDishes.map((dish,index) => (
            <Text key={index}>{dish}</Text>
          ))
        ): (
          <Text>None</Text>
        )}
      </View>
      <Link href="../../forms/editprofile">Edit profile</Link>
    </ParallaxScrollView>
  );
}

