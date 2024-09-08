import React, { useState, useEffect } from 'react';
import { Image, Text, Platform, View, Button, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import styles from "../styles/styles";
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';

type Recipe = {
    id: number,
    title: string,
    summary: string,
    ingredients: { name: string; original: string }[],
    instructions: { number: number; step: string }[],
    imageUrl: string,
    author: string,
    servings: number,
    readyInMinutes: number
}

export default function RecipeDetails() {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const { recipe: recipeParam } = useLocalSearchParams();

    useEffect(() => {
        if (recipeParam) {
            const parsedRecipe = JSON.parse(decodeURI(recipeParam as string)) as Recipe;
            setRecipe(parsedRecipe);
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
                <Image source={recipe.imageUrl} style={style.image} />
                <View >
                    <Text style={styles.subtitle}>{recipe.title}</Text>
                    <View style={styles.view}>
                        <Text style={styles.blacktext}>{recipe.summary}</Text>
                        <Text style={styles.blacktext}>by {recipe.author}</Text>
                        <Text style={styles.blacktext}>Serves: {recipe.servings}</Text>
                        <Text style={styles.blacktext}>Ready in: {recipe.readyInMinutes}</Text>
                        <View>
                            <Text style={styles.blacktextbold}>Ingredients</Text>
                            {recipe.ingredients.map((ingredient, index) => (
                                <View key={index}>
                                    <Text style={styles.blacktext}>{ingredient.original}</Text>
                                </View>

                            ))}
                        </View>
                        <View>
                            <Text style={styles.blacktextbold}>Instructions</Text>
                            {recipe.instructions.map((instructions, index) => (
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