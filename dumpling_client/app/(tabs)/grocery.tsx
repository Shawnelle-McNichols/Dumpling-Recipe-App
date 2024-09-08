import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View,  Text, FlatList} from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import styles from "../../styles/styles";
import GroceryList from '../GroceryList';


export default function MyRecipesScreen() {
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
      }>

       {/* Thisis the start of edit area */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Grocery List</ThemedText>
      </ThemedView>
      {/* Adding the GroceryList component to display the list */}
      <ThemedView style={styles.container}>
        <GroceryList />
      </ThemedView>
      {/* End of the modified area */}

    </ParallaxScrollView>
  );
}

// const styles = StyleSheet.create({
//   groceryContainer: {
//     backgroundColor: "#f8f8f8",
//     flex: 1,
//     padding: 16,
//     borderRadius: 8,
//   },
//   titleContainer: {
//     marginBottom: 20,
//     padding: 10,
//     alignItems: "center",
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   // Add any other styles you need here
// });


