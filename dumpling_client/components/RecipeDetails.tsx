import React, { useState, useEffect } from 'react';
import { Image, Text, Platform, View, Button, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import styles from "../styles/styles";
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

type Recipe = {
  id: number,
  title: string,
  summary: string,
  image: string,
  servings: number,
  readyInMinutes: number,
  extendedIngredients: { name: string; original: string ;image:string}[],
  analyzedInstructions: { number: number; step: string }[]
}


export default function RecipeDetails() {
  const router = useRouter();
  const { recipe: recipeParam } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
      if (recipeParam) {
          try {
              const parsedRecipe: Recipe | undefined = JSON.parse(decodeURIComponent(recipeParam as string));
              setRecipe(parsedRecipe);
          } catch (e) {
              setError("Failed to parse recipe data.");
          }
      }
  }, [recipeParam]);

    if (!recipe) {
        return <Text>No recipe selected</Text>;
    }

    return (
        <>
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
                <Image source={{uri:recipe.image}} style={style.image} />
                <View >
                    <Text style={styles.subtitle}>{recipe.title}</Text>
                    <View style={styles.view}>
                        <Text style={styles.blacktext}>{recipe.summary}</Text>
                        <Text style={styles.blacktext}>Serves: {recipe.servings}</Text>
                        <Text style={styles.blacktext}>Ready in: {recipe.readyInMinutes}</Text>
                        <View>
                            <Text style={styles.blacktextbold}>Ingredients</Text>
                            {recipe.extendedIngredients.map((ingredient, index) => (
                                <View key={index}>
                                    <Text style={styles.blacktext}>{ingredient.original}</Text>
                                </View>

                            ))}
                        </View>
                        <View>
                            <Text style={styles.blacktextbold}>Instructions</Text>
                            {recipe.analyzedInstructions.map((instructions, index) => (
                                <View key={index}>
                                    <Text style={styles.blacktext}>Step: {instructions.number}</Text>
                                    <Text style={styles.blacktext}>{instructions.step}</Text>
                                </View>

                            ))}
                        </View>
                    </View>

                    <View></View>
                </View>
            </ParallaxScrollView>
        </>
    );
};

const style = StyleSheet.create({
    card: {
        margin: 10,
        padding: 5,
        borderRadius: 10,
        shadowColor: "grey",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5
    },
    image: {
        width: "100%",
        height: 350,
        borderRadius: 12,
    }

})