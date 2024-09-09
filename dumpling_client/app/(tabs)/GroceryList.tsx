import { StyleSheet, Image, View, Text, FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { usePantry } from './grocery'; // Ensure correct path
// import styles from "../styles/styles";
import SampleComponent from './index';
import recipes from './recipes';

// Type for pantry items
type PantryItem = {
  name: string;
 // quantity: string;
};

// const GroceryList: React.FC = () => {
  export default function GroceryList() {
    const pantryData = usePantry(); // Fetch pantry data here
    // const pantry = usePantry();
    // const recipes = // Your recipe data;


  const renderPantryItem = ({ item }: { item: PantryItem }) => (
    <View style={styles.pantryItem}>
      <Text style={styles.pantryItemText}>{item.name}</Text>
      {/* <Text style={styles.pantryItemQuantity}>{item.quantity}</Text> */}
    </View>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#ffffff', dark: '#353636' }}
      headerImage={
        <View>
          <Image
            source={require('@/assets/images/react-logo.png')}
            style={styles.reactLogo}
          />
          <ThemedView style={styles.divider}/>
        </View>
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.header}>Grocery List</ThemedText>
      </ThemedView>
      <SampleComponent recipes={recipes} pantry={pantryData} /> {/* Pass pantry data here */}
      {/* <ThemedView style={styles.container}>
        <FlatList
          data={pantry}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderPantryItem}
        />

      </ThemedView> */}
    </ParallaxScrollView>
  );
};



// type GroceryListProps = {
//   pantryData: PantryItem[];
// };

// export default function GroceryList({ pantryData }: GroceryListProps) {
//   return (
//     <View style={styles.Container}>
//       <Text style={styles.header}>Grocery List</Text>
//       <FlatList
//         data={pantryData}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <Text style={styles.item}>
//             {/* {item.name}: {item.quantity} */}
//             {item.name}
//       </Text>
//         )}
//       />
//     </View>
//   );
// }

const styles = StyleSheet.create({
  // Define your styles here
  pantryItem: {
    padding: 10,
  },
  pantryItemText: {
    fontSize: 16,
  },
  reactLogo: {
    width: 100,
    height: 100,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
  },
  titleContainer: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
  }
});

// export default GroceryList;
