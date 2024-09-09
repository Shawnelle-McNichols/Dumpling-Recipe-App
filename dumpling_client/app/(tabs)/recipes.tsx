import axios from 'axios';
import { useEffect, useState } from 'react';
import { View, Text, FlatList, Image,Alert, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import styles from '@/styles/styles';
import { auth, db } from "../../scripts/firebaseConfig.mjs";
import { get, ref } from 'firebase/database';
import RecipeCard from '@/components/RecipeCard';
import RecipeCardSmall from '@/components/RecipeCardSmall';

// Define the Recipe type
type Ingredient = {
  name: string;
};

type Recipe = {
  id: number;
  title:string;
  image:string;
  time:number;
  ingredients:{
    text:string,
    quantity:number,
    measure:string,
    food:string,
    weight:number,
    foodId:string,
  }[];
};


// type Recipe = {
//   id: number;
//   title: string;
//   image: string;
//   servings:number;
//   readyInMinutes:number;
//   dairyFree: boolean;
//   diets:string[];
//   glutenFree:boolean;
//   ketogenic:boolean;
//   vegan:boolean;
//   vegetarian:boolean;
//   usedIngredientCount: number;
//   missedIngredientCount: number;
//   missedIngredients:Array<string>;
// };



// Example Component to fetch and display recipes
export default function RecipesScreen() {
  const [username, setUsername] = useState<string>("");
  const [favCuisines, setFavCuisines] = useState<string[]>([]);
  const [myDiet, setMyDiet] = useState<string[]>([]);
  const [favDishes, setFavDishes] = useState<string[]>([]);
  const [intolerances, setIntolerances] = useState<string[]>([]);
  const [pantry,setPantry] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch recipes based on ingredients
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = ref(db, `users/${user.uid}`);
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            const data = snapshot.val();
            console.log(data.pantry)
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

    const fetchRecipes = async () => {
      try {
        const thisPantry: String = Object.values(pantry).join(',');
        console.log("get pantry:" + thisPantry);
        const response = await axios.get('https://api.edamam.com/api/recipes/v2', {
          params: {
            app_id: '63c98e14',
            app_key: '29544855461e32b396324e77cb50dd89',
            q: thisPantry,
            type: 'public',
            from: 0,   // Start from the first result
            to: 5      // Retrieve 5 results
          }
        });
        const recipes = response.data.hits.map((hit: any) => ({
          id: hit.recipe.uri.split('#')[1],  // Extract ID from the URI
          title: hit.recipe.label,
          image: hit.recipe.image,
          time: hit.recipe.time,
          ingredients: hit.recipe.ingredients.map((ingredient: any) => ({
            text: ingredient.text,
            quantity: ingredient.quantity,
            measure: ingredient.measure,
            food: ingredient.food,
            weight: ingredient.weight,
            foodId: ingredient.foodId
          }))}));
        console.log(recipes);
        setRecipes(recipes);
        // const recipeIds = response.data.map((item: { id: number }) => item.id);
        // console.log(recipeIds);

        // for (let e = 0; e < recipeIds.length; e++) {
        //   const response2 = await axios.get(`https://api.spoonacular.com/recipes/${recipeIds[e]}/information`, {
        //     params: {
        //       apiKey: '7ba9b2ac70f3438dae91fc43b795e5b0'
        //     }
        //   })
        //   var theRecipes = response.data.map((item: {
        //     id: number;
        //     title: string;
        //     image: string;
        //     servings: number;
        //     readyInMinutes: number;
        //     dairyFree: boolean;
        //     diets: string[];
        //     glutenFree: boolean;
        //     ketogenic: boolean;
        //     vegan: boolean;
        //     vegetarian: boolean;
        //     usedIngredientCount: number;
        //     missedIngredientCount: number;
        //     missedIngredients: { name: string; id: number }[]; // Ensure this matches the structure
        //   }) => {
        //     // Extract the required properties
        //     return {
        //       id: item.id,
        //       title: item.title,
        //       image: item.image,
        //       servings: item.servings,
        //       readyInMinutes: item.readyInMinutes,
        //       dairyFree: item.dairyFree,
        //       diets: item.diets,
        //       glutenFree: item.glutenFree,
        //       ketogenic: item.ketogenic,
        //       vegan: item.vegan,
        //       vegetarian: item.vegetarian,
        //       usedIngredientCount: item.usedIngredientCount,
        //       missedIngredientCount: item.missedIngredientCount,
        //       missedIngredients: item.missedIngredients.map(i => i.name) // Extracting IDs
        //     };
        //   });
        //   console.log(theRecipes);
        //   setRecipes(theRecipes);
        // }
        
          
      } catch (error) {
        setError('Error fetching recipes here');
      }
    };
    
    fetchUserData();
    fetchRecipes();
    

   
  }, []);

  function handlePress(item: Recipe): void {
    throw new Error('Function not implemented.');
  }

  return (
    <ParallaxScrollView
    headerBackgroundColor={{ light: '#', dark: '#353636' }}
    headerImage={
      <View>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={styles.reactLogo}
        />
        <ThemedView style={styles.divider} />
      </View>
    }

  >
    
    <ThemedView style={styles.titleContainer}>
      <ThemedText style={styles.subtitle}>My Recipes</ThemedText>
    </ThemedView>
    <ThemedText style={styles.blacktext}>Here are a few recipe suggestions to get you started.</ThemedText>
    <View style={styles.container2}>

      {error && <Text>{error}</Text>}
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)} >
            <RecipeCardSmall recipe={item} />
          </TouchableOpacity>
        )}
      />

    </View>
  </ParallaxScrollView>
   
  );
}
