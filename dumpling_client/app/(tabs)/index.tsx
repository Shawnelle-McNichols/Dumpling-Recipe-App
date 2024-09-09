import React, { useState, useEffect } from 'react';
import { Image, Text, Platform, View, Button, TouchableOpacity, Alert, FlatList } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import styles from "../../styles/styles";
import { Link, useNavigation, useRouter } from 'expo-router';
const logo = require("../../assets/images/partial-react-logo.png");
import { auth, db } from "../../scripts/firebaseConfig.mjs";
import { ref, get } from "firebase/database";
import RecipeCard from '@/components/RecipeCard';
import axios from 'axios';

//insert later
const profImg = require("../../assets/images/profileimg.png");

// Basically a class for Recipe
type Recipe = {
    id: number;
    title: string;
    image: string;
    servings:number;
    readyInMinutes:number;
    extendedIngredients:string[];
}
//Fake Data Start--To be commented out

// const recipes: Recipe[] = [
//   {
//     id: 1,
//     title: "Baked Fajitas",
//     summary: "Spicy chicken and bell peppers baked together and served with warm tortillas and lime slices.",
//     ingredients: [
//       { name: "bell peppers", original: "2 bell peppers, sliced" },
//       { name: "onion", original: "1 onion, sliced" },
//       { name: "chicken breasts", original: "2 chicken breasts, sliced" },
//       { name: "olive oil", original: "2 tbsp olive oil" },
//       { name: "fajita seasoning", original: "1 tbsp fajita seasoning" },
//       { name: "tortillas", original: "4 tortillas" },
//       { name: "lime", original: "1 lime, sliced" }
//     ],
//     instructions: [
//       {
//         number: 1,
//         step: "Preheat oven to 400°F (200°C)."
//       },
//       {
//         number: 2,
//         step: "In a large bowl, combine the bell peppers, onion, and chicken slices."
//       },
//       {
//         number: 3,
//         step: "Drizzle with olive oil and sprinkle with fajita seasoning. Toss to coat."
//       },
//       {
//         number: 4,
//         step: "Spread the mixture on a baking sheet and bake for 20-25 minutes, until the chicken is cooked through and the vegetables are tender."
//       },
//       {
//         number: 5,
//         step: "Warm the tortillas in the oven for the last 5 minutes of baking."
//       },
//       {
//         number: 6,
//         step: "Serve the baked fajitas with tortillas and lime slices."
//       }
//     ],
//     imageUrl: require("../../assets/images/fakerecipe1.jpg"),
//     author: "Shawnelle McNichols",
//     servings: 2,
//     readyInMinutes: 20
//   },
//   {
//     id: 2,
//     title: "Spaghetti Carbonara",
//     summary: "Creamy pasta with eggs, Parmesan, crispy pancetta, and garlic, seasoned to perfection.",
//     ingredients: [
//       { name: "spaghetti", original: "400g spaghetti" },
//       { name: "pancetta", original: "200g pancetta, diced" },
//       { name: "eggs", original: "2 large eggs" },
//       { name: "Parmesan cheese", original: "100g Parmesan cheese, grated" },
//       { name: "garlic", original: "2 cloves garlic, minced" },
//       { name: "olive oil", original: "1 tbsp olive oil" },
//       { name: "salt and pepper", original: "Salt and pepper to taste" }
//     ],
//     instructions: [
//       {
//         number: 1,
//         step: "Cook the spaghetti according to the package instructions until al dente."
//       },
//       {
//         number: 2,
//         step: "While the pasta is cooking, heat the olive oil in a large skillet over medium heat."
//       },
//       {
//         number: 3,
//         step: "Add the pancetta and garlic, and cook until the pancetta is crispy."
//       },
//       {
//         number: 4,
//         step: "In a small bowl, whisk together the eggs and grated Parmesan cheese."
//       },
//       {
//         number: 5,
//         step: "Drain the spaghetti, reserving a cup of the pasta water."
//       },
//       {
//         number: 6,
//         step: "Quickly toss the spaghetti with the pancetta and garlic in the skillet."
//       },
//       {
//         number: 7,
//         step: "Remove the skillet from the heat and add the egg and cheese mixture, stirring quickly to create a creamy sauce."
//       },
//       {
//         number: 8,
//         step: "If the sauce is too thick, add a bit of the reserved pasta water to loosen it."
//       },
//       {
//         number: 9,
//         step: "Season with salt and pepper to taste, and serve immediately."
//       }
//     ],
//     imageUrl: require("../../assets/images/fakerecipe2.jpg"),
//     author: "Shuting Tang",
//     servings: 2,
//     readyInMinutes: 20
//   },
//   {
//     id: 3,
//     title: "Margherita Pizza",
//     summary: "Classic pizza topped with tomato sauce, mozzarella, and fresh basil, baked to a golden crisp.",
//     ingredients: [
//       { name: "pizza dough", original: "1 pizza dough" },
//       { name: "tomato sauce", original: "1/2 cup tomato sauce" },
//       { name: "fresh mozzarella", original: "200g fresh mozzarella, sliced" },
//       { name: "fresh basil leaves", original: "1/4 cup fresh basil leaves" },
//       { name: "olive oil", original: "2 tbsp olive oil" },
//       { name: "salt", original: "Salt to taste" }
//     ],
//     instructions: [
//       {
//         number: 1,
//         step: "Preheat your oven to 475°F (245°C)."
//       },
//       {
//         number: 2,
//         step: "Roll out the pizza dough on a lightly floured surface."
//       },
//       {
//         number: 3,
//         step: "Spread the tomato sauce evenly over the dough."
//       },
//       {
//         number: 4,
//         step: "Arrange the mozzarella slices on top of the sauce."
//       },
//       {
//         number: 5,
//         step: "Drizzle with olive oil and season with a pinch of salt."
//       },
//       {
//         number: 6,
//         step: "Bake the pizza in the preheated oven for 10-12 minutes, or until the crust is golden and the cheese is bubbly."
//       },
//       {
//         number: 7,
//         step: "Remove from the oven and scatter fresh basil leaves over the top."
//       },
//       {
//         number: 8,
//         step: "Slice and serve immediately."
//       }
//     ],
//     imageUrl: require("../../assets/images/fakerecipe3.jpg"),
//     author: "Yingying Wei",
//     servings: 2,
//     readyInMinutes: 20
//   },
// ];
//End of -- To be commented out


export default function HomeScreen() {
  const [username, setUsername] = useState<string>("");
  const [favCuisines, setFavCuisines] = useState<string[]>([]);
  const [myDiet, setMyDiet] = useState<string[]>([]);
  const [favDishes, setFavDishes] = useState<string[]>([]);
  const [intolerances, setIntolerances] = useState<string[]>([]);
  const [pantry,setPantry] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  //passes the selected recipe information to RecipeDetails
  const handlePress = (recipe: Recipe) => {
    const data = encodeURIComponent(JSON.stringify(recipe));
    router.push(`/RecipeDetails?recipe=${data}`);
  }

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
            setIntolerances(data.intolerances || []);
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
    const fetchRandomRecipes = async () => {
      try {
        /* ----------- use the spoonacular Apis ----------------*/
        const response = await axios.get('https://api.spoonacular.com/recipes/random', {
          params: {
            apiKey: 'e8099cbd3a264bd288bfa39b349bd79a',
            number:4
          }
        });
        const allRecipes: Recipe[]=response.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          image: item.image,
          servings: item.servings,
          readyInMinutes: item.readyInMinutes,
          extendedIngredients: item.extendedIngredients.map((i: { name: string }) => i.name)
        }));
       setRecipes(allRecipes);
      } catch (error) {
        setError('Error fetching recipes here');
      }
    };

    const fetchRecipes = async () => {
      try {
        const thisIntolerances: String = Object.values(intolerances).join(',');
        const thisDiet: String = Object.values(myDiet).join(',');
        /* ----------- use the spoonacular Apis ----------------*/
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
          params: {
            apiKey: 'e8099cbd3a264bd288bfa39b349bd79a', // 0c5808d00bf7421f92a78a69d6e86016
            intolerances:thisIntolerances,
            diet:thisDiet,
            number:4
          }
        });
        
        const allRecipes: Recipe[] = [];
        for (let index = 0; index < response.data.results.length; index++) {
          const id = response.data.results[index].id;
          const response2 = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
            params: {
              apiKey: '53b84dc3adc445898ab9b81020960a4a'// 0c5808d00bf7421f92a78a69d6e86016
            }
          });
          const thisRecipe:Recipe = {
            id: response2.data.id,
            title: response2.data.title,
            image: response2.data.image,
            servings: response2.data.servings,
            readyInMinutes: response2.data.readyInMinutes,
            extendedIngredients: response2.data.extendedIngredients.map((i: { name: string }) => i.name)
          };
          
          allRecipes.push(thisRecipe);
        }
     
       setRecipes(allRecipes);

       
      } catch (error) {
        setError('Error fetching recipes here');
      }
    };

    fetchUserData();
    if( myDiet == null && intolerances == null){
      fetchRandomRecipes();
    }else{
      fetchRecipes();
    }
    
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#', dark: '#353636' }}
      headerImage={
        <View style={styles.view}>
          <Image
            source={require('@/assets/images/react-logo.png')}
            style={styles.reactLogo}
          />
          <ThemedView style={styles.divider} />
        </View>
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.header}>Welcome, {username}</ThemedText>
      </ThemedView>
      <ThemedText style={styles.blacktext}>Here are a few recipe suggestions to get you started.</ThemedText>
      <View style={styles.container2}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)} >
            <RecipeCard recipe={item} />
          </TouchableOpacity>
        )}
      />
      </View>
    </ParallaxScrollView>
  );
};
function setError(arg0: string) {
  throw new Error('Function not implemented.');
}

