import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Image,Alert, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import styles from '@/styles/styles';
import { auth, db } from "../../scripts/firebaseConfig.mjs";
import { get, push, ref, set } from 'firebase/database';
import RecipeCard from '@/components/RecipeCard';
import RecipeCardSmall from '@/components/RecipeCardSmall';
import MyContext from '@/components/MyContext';
import { useRouter } from 'expo-router';


// Define the Recipe type
type Ingredient = {
  id: number;
  name: string;
  image: string;
  amount: number;
  unit: string;
};
type RecipeData ={
  recipeDetail:RecipeDetail;
  recipe:Recipe;
}
type Recipe = {
    id: number;
    title: string;
    image: string;
    usedIngredientCount: number;
    missedIngredientCount: number;
    missedIngredients: Ingredient[];
  };
  type RecipeDetail = {
    id: number;
    title: string;
    summary: string;
    image: string;
    servings: number;
    readyInMinutes: number;
    extendedIngredients: { name: string; original: string ;image:string}[];
    analyzedInstructions: { number: number; step: string }[];
  }

// type Recipe = {
//   id: number;
//   title: string;
//   image: string;
//   servings:number;
//   readyInMinutes:number;
//   extendedIngredients:string[];
  
// };

// type Recipe = {
//   id: number;
//   title: string;
//   image: string;
//   usedIngredientCount: number;
//   missedIngredientCount: number;
//   missedIngredients:string[];
// };
// const recipes: Recipe[] = [
//   {
//       id: 645555,
//       title: "Green Tomato Salad",
//       image: "https://img.spoonacular.com/recipes/645555-312x231.jpg",
//       usedIngredientCount: 1,
//       missedIngredientCount: 2,
//       missedIngredients: [
//           {
//               id: 10211111,
//               amount: 1,
//               unit: "teaspoon",
//               name: "sumac powder",
//               image: "https://img.spoonacular.com/ingredients_100x100/dried-sumac.jpg"
//           },
//           {
//               id: 99226,
//               amount: 1,
//               unit: "handful",
//               name: "sage and mint leaves",
//               image: "https://img.spoonacular.com/ingredients_100x100/fresh-sage.png"
//           }
//       ]
//   },
//   {
//       id: 715870,
//       title: "Salsa",
//       image: "https://img.spoonacular.com/recipes/715870-312x231.jpg",
//       usedIngredientCount: 1,
//       missedIngredientCount: 3,
//       missedIngredients: [
//           {
//               id: 15012,
//               amount: 1,
//               unit: "serving",
//               name: "texas cowboy caviar",
//               image: "https://img.spoonacular.com/ingredients_100x100/caviar.png"
//           },
//           {
//               id: 6164,
//               amount: 1,
//               unit: "serving",
//               name: "cranberry avocado salsa",
//               image: "https://img.spoonacular.com/ingredients_100x100/salsa.png"
//           },
//           {
//               id: 27028,
//               amount: 1,
//               unit: "serving",
//               name: "roasted tomatillo salsa",
//               image: "https://img.spoonacular.com/ingredients_100x100/salsa-verde.png"
//           }
//       ]
//   },
//   {
//       id: 1674265,
//       title: "Easy Tomato Soup",
//       image: "https://img.spoonacular.com/recipes/1674265-312x231.jpg",
//       usedIngredientCount: 1,
//       missedIngredientCount: 3,
//       missedIngredients: [
//           {
//               id: 1001,
//               amount: 4,
//               unit: "tablespoons",
//               name: "butter",
//               image: "https://img.spoonacular.com/ingredients_100x100/butter-sliced.jpg"
//           },
//           {
//               id: 11282,
//               amount: 1,
//               unit: "",
//               name: "onion",
//               image: "https://img.spoonacular.com/ingredients_100x100/brown-onion.png"
//           },
//           {
//               id: 6615,
//               amount: 1.5,
//               unit: "cups",                 
//               name: "vegetable broth",
//               image: "https://img.spoonacular.com/ingredients_100x100/chicken-broth.png"
//           }
//       ]
//   }
// ]


// Example Component to fetch and display recipes
export default function RecipesScreen() {
  const [username, setUsername] = useState<string>("");
  const [favCuisines, setFavCuisines] = useState<string[]>([]);
  const [myDiet, setMyDiet] = useState<string[]>([]);
  const [favDishes, setFavDishes] = useState<string[]>([]);
  const [intolerances, setIntolerances] = useState<string[]>([]);
  const [pantry,setPantry] = useState<string[]>([]);
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetail[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipeData, setRecipeData] = useState<RecipeData[] >([]);
  const [error, setError] = useState<string | null>(null);
  const context = useContext(MyContext);
  const [newItem, setNewItem] = useState<string>("");
  // Fetch recipes based on ingredients
 

  // const addRecipes = async () => {
  //   const user = auth.currentUser;
  //   if (user) {
  //     if (newItem == "") {
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

        /* ----------- use the spoonacular Apis : findByIngredients ----------------*/
        const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
          params: {
            apiKey: 'e8099cbd3a264bd288bfa39b349bd79a',
            ingredients:thisPantry,
            ranking:1,
            number:3
          }
        });
        console.log(response.data);
        setRecipes(response.data);
        const allRecipes = response.data.results.map((item: any) => {
          return {
            id: item.id,
            title: item.title,
            image: item.image,
            usedIngredientCount: item.usedIngredientCount,
            missedIngredientCount: item.missedIngredientCount,
            missedIngredients: item.missedIngredients.map((ingredient: any) => ({
              id: ingredient.id,
              name: ingredient.name,
              image: ingredient.image,
              amount: ingredient.amount,
              unit: ingredient.unitShort
            }))
          };
        });
       

        console.log(response.data);
        setRecipes(response.data);
        // /* ----------- use the spoonacular Apis : complexSearch ----------------*/
        // const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
        //   params: {
        //     apiKey: 'e8099cbd3a264bd288bfa39b349bd79a',
        //     includeIngredients:thisPantry,
        //     ranking:1,
        //     number:3
        //   }
        // });

        // const allRecipes: Recipe[] = [];
        // const allRecipesDetail: RecipeDetail[] = [];
        // const allRecipesData: RecipeData[] = [];
       
        // for (let index = 0; index < response.data.results.length; index++) {
 
        //   const id = response.data.results[index].id;
        //   const response2 = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
        //     params: {
        //       apiKey: '53b84dc3adc445898ab9b81020960a4a'// 0c5808d00bf7421f92a78a69d6e86016
        //     }
        //   });
         
        //   const thisRecipe: Recipe= {
        //     id: response2.data.id,
        //     title: response2.data.title,
        //     image: response2.data.image,
        //     usedIngredientCount: response.data.results[index].usedIngredientCount,
        //     missedIngredientCount:  response.data.results[index].missedIngredientCount,
        //     missedIngredients:  response.data.results[index].missedIngredients.map((ingredient: any) => ({
        //       id: ingredient.id,
        //       name: ingredient.name,
        //       image: ingredient.image,
        //       amount: ingredient.amount,
        //       unit: ingredient.unitShort
        //     }))
           
        //   }
        //   allRecipes.push(thisRecipe);

        //   const thisRecipeDetail:RecipeDetail= {
        //     id: response2.data.id,
        //     title: response2.data.title,
        //     image: response2.data.image,
        //     servings: response2.data.servings,
        //     readyInMinutes: response2.data.readyInMinutes,
        //     summary: response2.data.summary,
        //     extendedIngredients: response2.data.extendedIngredients.map((ingredient: any) => ({
        //         name: ingredient.name,
        //         original: ingredient.original,
        //         image: ingredient.image
        //     })),
        //     analyzedInstructions: response2.data.analyzedInstructions.map((instruction: any) => ({
        //         number: instruction.number,
        //         step: instruction.step
        //     }))
        //   }
        //   allRecipesDetail.push(thisRecipeDetail);

        //   const recipeData: RecipeData = {
        //     recipe: thisRecipe,
        //     recipeDetail: thisRecipeDetail
        //   };
          
        //   allRecipesData.push(recipeData);
        // }
        
        // setRecipes(allRecipes);
        // setRecipeDetails(allRecipesDetail);
        // setRecipeData(allRecipesData);

      } catch (error) {
        setError('Error fetching recipes here');
      }
    };
    fetchUserData();
    fetchRecipes();

  }, []);

  // function handlePress(item: Recipe): void {
  //   throw new Error('Function not implemented.');
  // }
  const router = useRouter();
  //passes the selected recipe information to RecipeDetails
  const handlePress = (recipe: RecipeDetail) => {
    const data = encodeURIComponent(JSON.stringify(recipe));
    router.push(`../../components/RecipeDetails?recipe=${data}`);
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
      {/* <FlatList
          data={recipeData}
          keyExtractor={(item) => item.recipe.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item.recipeDetail)} >
              <RecipeCardSmall recipe={item.recipe} />
            </TouchableOpacity>
            
          )}
        /> */}
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity >
              <RecipeCardSmall recipe={item} />

            </TouchableOpacity>
            
          )}  />

       
    </View>
  </ParallaxScrollView>
   
  );
}
