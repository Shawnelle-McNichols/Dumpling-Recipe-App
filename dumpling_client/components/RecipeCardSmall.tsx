import React, { useState, useEffect } from 'react';
import { Image, ImageProps ,Text, View, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import styles from "../styles/styles";
import { get, push, ref, set } from 'firebase/database';
import { auth, db } from '@/scripts/firebaseConfig.mjs';
type Ingredient = {
  id: number;
  name: string;
  image: string;
  amount: number;
  unit: string;
};

type Recipe = {
    id: number;
    title: string;
    image: string;
    usedIngredientCount: number;
    missedIngredientCount: number;
    missedIngredients: Ingredient[];
  };
// type Recipe = {
//   id: number;
//   title: string;
//   image: string;
//   ingredients: {
//     text: string;
//     quantity: number;
//     measure: string;
//     food: string;
//     weight: number;
//     foodId: string;
//   }[];
// };

// type Recipe = {
//   id: number;
//   title: string;
//   image: string;
//   usedIngredientCount: number;
//   missedIngredientCount: number;
//   missedIngredients:string[];
// };


type props = {
    recipe: Recipe;
}

export default function RecipeCard({ recipe }: props) {
  const [pantry,setPantry] = useState<string[]>([]);
  const [newGrocery, setNewGrocery] = useState<string[]>([]);
  const [newItem, setNewItem] = useState<string[]>();
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = ref(db, `users/${user.uid}`);
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            const data = snapshot.val();
            setPantry(data.pantry|| []);
            
          } else {
            Alert.alert("User needs to set up their profile.");
          }
        } catch (error) {
          Alert.alert("Error fetching user data");
        }
      } else {
        Alert.alert("No user signed in");
      }
    };

    fetchUserData();

  }, []);

  // const addGrocery= async () => {
  //   const user = auth.currentUser;
  //   if (user) {
  //     if (newItem == null) {
  //       Alert.alert("Enter an item.");
  //       return;
  //     }
  //     const pantryRef = ref(db, `users/${user.uid}/pantry`);
  //     const newItemRef = push(pantryRef);
  //     await set(newItemRef, newItem.trim());
  //     setNewItem("");
  //   } else {
  //     Alert.alert("Please enter an item.");
  //   }
  // }

  // const addItem= async () => {
  //   const user = auth.currentUser;
  //   if (user) {
  //     if (newItem == null) {
  //       Alert.alert("Enter an item.");
  //       return;
  //     }
  //     const pantryRef = ref(db, `users/${user.uid}/pantry`);
  //     const newItemRef = push(pantryRef);
  //     await set(newItemRef, newItem.trim());
  //     setNewItem("");
  //   } else {
  //     Alert.alert("Please enter an item.");
  //   }
  // }

    return (
        <View style={style.container}>
            <Image style={style.image} source={{uri: recipe.image}} />
            <View style={style.textContainer}>
                <Text style={style.subtitle}>{recipe.title}</Text>
                {/* <Text style={style.text}>Serves: {recipe.readyInMinutes}</Text> */}
                <Text style={style.text}>Missed Ingredients: {Object.values(recipe.missedIngredients).join(', ')}</Text>
            </View>
            {/* <View style={styles.form_group}>
              <ThemedText style={styles.blacktext}>Add Pantry Item</ThemedText>
              <TextInput
                style={style.input}
                value={newItem}
                onChangeText={setNewItem}
                autoCapitalize="none" />
            </View> */}
        </View>
    );
};

const style = StyleSheet.create({
  container: {
    padding:10,
    width:'100%',
    height:'100%',
    flexDirection: 'row', 
    alignItems: 'center', 
    borderRadius: 10,
    shadowColor:"grey",
    shadowOffset:{width:0, height:4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation:5
  },
  image: {
    width: '40%',
    height: 150,
    padding: 10, 
    margin:10
  },
  textContainer: {
    flex: 1, 
  },
  subtitle:{
    fontSize: 16,
  },
  text: {
    fontSize: 12,
  },
  input: {
    width: 250,
    height: 55,
    borderColor: "rgba(245, 157, 86, 0.5)",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 18,
    padding: 5,
  }

})