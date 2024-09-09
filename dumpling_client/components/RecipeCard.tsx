import React, { useState, useEffect } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import styles from "../styles/styles";
import { router, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { LightSpeedOutLeft } from 'react-native-reanimated';

type Recipe = {
  id: number;
  title: string;
  image: string;
  servings:number;
  readyInMinutes:number;
  extendedIngredients:string[];
}
type props = {
  recipe: Recipe,
}
const handlePress = (recipe: Recipe) => {
  const data = encodeURIComponent(JSON.stringify(recipe));
  router.push(`/RecipeDetails?recipe=${data}`);
}

export default function RecipeCard({ recipe }: props) {
    return (
     
        <View style={style.card}>
            <Image style={style.image} source={{uri:recipe.image}} />
            <View style={styles.view}>
                <Text style={styles.subtitle}>{recipe.title}</Text>
                <Text style={styles.blacktext}>Serving: {recipe.servings}</Text>
                <Text style={styles.blacktext}>Cooking Time: {recipe.readyInMinutes} minutes</Text>
                {/* <Text style={style.text}>Igredients: {Object.values(recipe.extendedIngredients).join(",")} minutes</Text> */}
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    card: {
        margin: 10,
        padding:10,
        borderRadius: 10,
        shadowColor:"grey",
        shadowOffset:{width:0, height:4},
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation:5,
        alignItems: 'center', 
        justifyContent: 'center',
        textAlign:'left'
    },
    image: {
        margin: 10,
        width: 250,
        height: 200,
        borderRadius: 10
    }
})

function setUsername(arg0: any) {
  throw new Error('Function not implemented.');
}
function setFavCuisines(arg0: any) {
  throw new Error('Function not implemented.');
}

function setMyDiet(arg0: any) {
  throw new Error('Function not implemented.');
}

function setFavDishes(arg0: any) {
  throw new Error('Function not implemented.');
}

function setIntolerances(arg0: any) {
  throw new Error('Function not implemented.');
}

