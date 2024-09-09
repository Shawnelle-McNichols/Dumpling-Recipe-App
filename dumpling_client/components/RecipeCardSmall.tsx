import React, { useState, useEffect } from 'react';
import { Image, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import styles from "../styles/styles";

type Recipe = {
  id: number;
  title: string;
  image: string;
  time: number;
  ingredients: {
    text: string;
    quantity: number;
    measure: string;
    food: string;
    weight: number;
    foodId: string;
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
//   missedIngredients:Array<{
//                         id: number;
//                         name: string;
//                         image: string;
//                         amount: number;
//                     }>
// };

type props = {
    recipe: Recipe;
}

export default function RecipeCard({ recipe }: props) {
  const [pantry,setPantry] = useState<string[]>([]);
  const ingredients = recipe.ingredients.map(item => item.food);
  ingredients.forEach(element => {
    
  });
    return (
        <View style={style.container}>
            <Image style={style.image} source={recipe.image} />
            <View style={style.textContainer}>
                <Text style={style.subtitle}>{recipe.title}</Text>
                {/* <Text style={style.text}>Serves: {recipe.time}</Text> */}
                <Text style={style.text}>Ingredients: {Object.values(ingredients).join(',')}</Text>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
  container: {
    width:500,
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10, 
  },
  textContainer: {
    flex: 1, 
  },
  subtitle:{
    fontSize: 20,
  },
  text: {
    fontSize: 16,
  },

})