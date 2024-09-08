import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import styles from "../../styles/styles";
import { Link, useRouter } from "expo-router";
import { auth, db } from "../../scripts/firebaseConfig.mjs";
import { ref, set } from "firebase/database";
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';


export default function EditProfile() {
    const [username, setUsername] = useState<string>("");
    const [favCuisines, setFavCuisines] = useState<string[]>([]);
    const [myDiet, setMyDiet] = useState<string[]>([]);
    const [favDishes, setFavDishes] = useState<string[]>([]);
    const [intolerances, setIntolerances] = useState<string[]>([]);
   // const [customCuisine, setCustomCuisine] = useState<string>("");
   // const [customDiet, setCustomDiet] = useState<string>("");
   // const [customDish, setCustomDish] = useState<string>("");
   //const [customAllergy, setCustomAllergy] = useState<string>("[]");
    const router = useRouter();

    const Cuisines = ["Caribbean", "Chinese", "Italian", "Mexican", "Indian", "Japanese","Korean","Mediterranean","French"];
    const Diets = ["Vegan", "Vegetarian", "Ketogenic", "Gluten Free", "Low FODMAP", "Paleo"];
    const Dishes = ["Pizza", "Pasta", "Salad", "Sandwiches", "Soup", "Seafood"];
    const Intolerances = ["Peanut", "Shellfish", "Dairy", "Gluten", "Soy","Egg"];

    const toggleSelection = (item:string, list:string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
        if (list.length < 3 || list.includes(item)){
            setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
        }else{
            Alert.alert("Sorry! You can only pick up tp 3 items.");
        }
    }

    /*const addCustomItem = (customItem: string, setCustomItem: React.Dispatch<React.SetStateAction<string>>,
        list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
            if (customItem.trim() !== ''){
                setList([...list, customItem.trim()]);
                setCustomItem('');
            }
        }*/

    const handleProfileEdit = async () => {
        const user = auth.currentUser;
        if (user) {
            try {
                await set(ref(db, `users/${user.uid}`), {
                    username,
                    favCuisines,
                    myDiet,
                    favDishes,
                    intolerances,
                });
                Alert.alert("Profile setup complete");
                router.push("/(tabs)");
            } catch (error) {
                Alert.alert("Error setting up profile");
            }
        } else {
            Alert.alert("Please sign in to update this profile.")
            router.push("/login");
        }

    }
    return (
        <ScrollView>
            <View style={styles.container}>
            <Text style={styles.header}>Set up Profile</Text>
            <Text>Before you continue, we need to know a few important details.</Text>

            <View style={styles.form_group}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none" />
            </View>

            <View style={styles.form_group}>
                <Text style={styles.label}>Choose up to 3 of your favourite cuisines.</Text>
                <View style={styles.grid}>
                {Cuisines.map((cuisine)=> (
                    <TouchableOpacity key={cuisine} onPress={() => toggleSelection(cuisine, favCuisines,setFavCuisines)}>
                        <Text style={favCuisines.includes(cuisine) ? styles.selectedOption : styles.option}>{cuisine}</Text>
                    </TouchableOpacity>
                ))}
                </View>
                {/*<TextInput
                style={styles.input}
                placeholder='Other'
                value={customCuisine}
                onChangeText={setCustomCuisine}
                onSubmitEditing={() => addCustomItem(customCuisine,setCustomCuisine,favCuisines,setFavCuisines)}/>*/}
            </View>

            <View style={styles.form_group}>
                <Text style={styles.label}>Any specific diet?</Text>
                <View style={styles.grid}>
                {Diets.map((diet)=> (
                    <TouchableOpacity key={diet} onPress={() => toggleSelection(diet, myDiet,setMyDiet)}>
                        <Text style={myDiet.includes(diet) ? styles.selectedOption : styles.option}>{diet}</Text>
                    </TouchableOpacity>
                ))}
                </View>
                {/*<TextInput
                style={styles.input}
                placeholder='Other'
                value={customDiet}
                onChangeText={setCustomDiet}
                onSubmitEditing={() => addCustomItem(customDiet,setCustomDiet,myDiet,setMyDiet)}/>*/}
            </View>

            <View style={styles.form_group}>
                <Text style={styles.label}>Tell me about your favourite dishes.</Text>
                <View style={styles.grid}>
                {Dishes.map((dish)=> (
                    <TouchableOpacity key={dish} onPress={() => toggleSelection(dish, favDishes,setFavDishes)}>
                        <Text style={favDishes.includes(dish) ? styles.selectedOption : styles.option}>{dish}</Text>
                    </TouchableOpacity>
                ))}
                </View>
                {/*<TextInput
                style={styles.input}
                placeholder='Other'
                value={customDish}
                onChangeText={setCustomDish}
                onSubmitEditing={() => addCustomItem(customDish,setCustomDish,favDishes,setFavDishes)}/>*/}
            </View>
            <View style={styles.form_group}>
                <Text style={styles.label}>Do you have any allergies/intolerances?</Text>
                <View style={styles.grid}>
                {Intolerances.map((intolerance)=> (
                    <TouchableOpacity key={intolerance} onPress={() => toggleSelection(intolerance, intolerances,setIntolerances)}>
                        <Text style={intolerances.includes(intolerance) ? styles.selectedOption : styles.option}>{intolerance}</Text>
                    </TouchableOpacity>
                ))}
                </View>
                {/*<TextInput
                style={styles.input}
                placeholder='Other'
                value={customCuisine}
                onChangeText={setCustomCuisine}
                onSubmitEditing={() => addCustomItem(customCuisine,setCustomCuisine,favCuisines,setFavCuisines)}/>*/}
            </View>

            <View style={styles.form_group}>
                <TouchableOpacity style={styles.btn_main_md} onPress={handleProfileEdit}>
                    <Text style={styles.whitefont}>Complete Profile</Text>
                </TouchableOpacity>
            </View>
            </View>
        </ScrollView>
    )
}