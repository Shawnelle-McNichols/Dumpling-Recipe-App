import { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, TextInput, TouchableOpacity, Text, Alert, FlatList } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { auth, db } from "../../scripts/firebaseConfig.mjs";
import { ref, set, remove, onValue, push } from "firebase/database";

import styles from "../../styles/styles";
import { useRouter } from 'expo-router';

export default function PantryScreen() {
  const [newItem, setNewItem] = useState<string>("");
  const [pantryItems, setPantryItems] = useState<{ key: string; name: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const pantryRef = ref(db, `users/${user.uid}/pantry`);
      const unsubscribe = onValue(pantryRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const items = Object.entries(data).map(([key, value]) => ({
            key,
            name: value as string
          }));
          setPantryItems(items);
        } else {
          setPantryItems([]);
        }
      });
      return () => unsubscribe();
    }
  }, []);

  const addItem = async () => {
    const user = auth.currentUser;
    if (user) {
      if (newItem == "") {
        Alert.alert("Enter an item.");
        return;
      }
      const pantryRef = ref(db, `users/${user.uid}/pantry`);
      const newItemRef = push(pantryRef);
      await set(newItemRef, newItem.trim());
      setNewItem("");
    } else {
      Alert.alert("Please enter an item.");
    }
  }

  const removeItem = async (key: string) => {
    const user = auth.currentUser;
    if (user) {
      const itemRef = ref(db, `users/${user.uid}/pantry/${key}`);
      await remove(itemRef);
    } else {
      Alert.alert("You need to log in to change this information.")
    }
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
      </ParallaxScrollView>
      <View style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Pantry</ThemedText>
        </ThemedView>
        <ThemedView>
          <View style={styles.form_group}>
            <ThemedText >Add Pantry Item</ThemedText>
            <TextInput
              style={styles.input}
              value={newItem}
              onChangeText={setNewItem}
              autoCapitalize="none" />
          </View>
          <View style={styles.form_group} >
            <TouchableOpacity style={styles.btn_main_sm} onPress={addItem}>
              <Text style={styles.whitefont}>Add</Text>
            </TouchableOpacity>
          </View>
        </ThemedView>
        <ThemedView>
          <ThemedText type="subtitle">Pantry Items</ThemedText>
          <FlatList
            data={pantryItems}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <View><Text>{item.name}</Text>
                <TouchableOpacity onPress={() => removeItem(item.key)}>
                  <Ionicons name="trash-outline" size={24} color="red" /></TouchableOpacity>
              </View>
            )}
          />
        </ThemedView>
      </View>
    </>
  );
}

