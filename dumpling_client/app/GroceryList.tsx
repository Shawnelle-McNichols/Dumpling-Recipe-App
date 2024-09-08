import { Text, View, FlatList, StyleSheet } from "react-native";
import React from "react";
// import styles from "../styles/styles";

// Hardcoded grocery data
const groceryData = [
  { id: "1", name: "Flour", quantity: "2 kg" },
  { id: "2", name: "Soy Sauce", quantity: "1 bottle" },
  { id: "3", name: "Garlic", quantity: "5 cloves" },
  { id: "4", name: "Tomate", quantity: "1 large" },
];

export default function GroceryList() {
  return (
    <View style={styles.Container}>
      <Text style={styles.header}>Grocery List</Text>
      <FlatList
        data={groceryData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.name}: {item.quantity}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    fontSize: 20,
    marginVertical: 8,
  },
});
