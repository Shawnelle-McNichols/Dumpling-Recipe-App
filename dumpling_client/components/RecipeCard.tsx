import React, { useState, useEffect } from 'react';
import { Image, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import styles from "../styles/styles";

// type Recipe = {
//     id: number,
//     title: string,
//     summary: string,
//     ingredients: { name: string; original: string }[],
//     instructions: { number: number; step: string }[],
//     imageUrl: string,
//     author: string,
//     servings: number,
//     readyInMinutes: number
// }

type Recipe = {
  id: number;
  title: string;
  image:string;
  time:number;
  diet:string[];
  cuisineType:string[];
  dishType:string[];
  
};
type props = {
    recipe: Recipe;
}

export default function RecipeCard({ recipe }: props) {
    return (
        <View style={style.card}>
            <Image style={style.image} source={recipe.image} />
            <View style={styles.view}>
                <Text style={styles.subtitle}>{recipe.title}</Text>
                <Text style={styles.blacktext}>by {recipe.author}</Text>
                <Text style={styles.blacktext}>Serves: {recipe.servings}</Text>
                <Text style={styles.blacktext}>Ready in: {recipe.readyInMinutes} minutes </Text>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    card: {
        margin: 10,
        padding:5,
        borderRadius: 10,
        shadowColor:"grey",
        shadowOffset:{width:0, height:4},
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation:5
    },
    image: {
        width: 330,
        height: 200,
        borderRadius: 10
    }

})