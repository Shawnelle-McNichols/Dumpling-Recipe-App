import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, Text, FlatList, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import styles from "../../styles/styles";
import GroceryList from '../../components/GroceryList';
import { auth, db } from "../../scripts/firebaseConfig.mjs";
import { ref, get } from "firebase/database";


// Type for pantry items
type PantryItem = {
  name: string;
  // quantity: string;
};

export default function grocery() {
  const [pantry, setPantry] = useState<PantryItem[]>([]);

  // Function to fetch pantry data from Firebase
  useEffect(() => {
    const fetchPantryData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const pantryRef = ref(db, `users/${user.uid}/pantry`);
          const snapshot = await get(pantryRef);

          if (snapshot.exists()) {
            const pantryData = snapshot.val();
            const formattedData = Object.entries(pantryData).map(([key,value]) => ({
              key,
              name: value as string
             }));
            console.log("Fetched pantry data:", formattedData); // Add this line for testing
            // setPantry(pantryData || []);
            setPantry(formattedData);
          } else {
            Alert.alert("No pantry data found.");
          }
        } catch (error) {
          Alert.alert("Error fetching pantry data");
        }
      } else {
        Alert.alert("No user signed in");
      }
    };

    fetchPantryData();
  }, []);

  // Render pantry items in a FlatList
  const renderPantryItem = ({ item }: { item: PantryItem }) => (
    <View style={style.pantryItem}>
      <Text style={style.pantryItemText}>{item.name}</Text>
      {/* <Text style={styles.pantryItemQuantity}>{item.quantity}</Text> */}
    </View>
  );
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#ffffff', dark: '#353636' }}
      headerImage={
        <View>
          <Image
            source={require('@/assets/images/react-logo.png')}
            style={styles.reactLogo}
          />
          <ThemedView style={styles.divider}/>
        </View>
      }>

       {/* Thisis the start of edit area */}
        {/* Title */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.header} >Grocery List</ThemedText>
      </ThemedView>

      {/* Adding the GroceryList component to display the list */}
      <ThemedView style={styles.container}>
        <FlatList
            data={pantry}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderPantryItem}

          />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const style = StyleSheet.create({
  // pantryItem: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   padding: 5,
  //   borderBottomColor: "#F59D56",
  //   borderBottomWidth: .5
  // },
  // form:{
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems:"center"
  // },

  // container: {
  //   flex: 1,
  //   padding: 10,
  //   backgroundColor: '#f0f0f0',
  // },
  pantryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Center items vertically
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#ffffff', // Background color of each item
    borderRadius: 8, // Rounded corners
    shadowColor: '#000', // Shadow color for elevation effect
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 2, // For Android shadow
  },
  pantryItemText: {
    fontSize: 16,
    color: '#333', // Text color
  },

})

