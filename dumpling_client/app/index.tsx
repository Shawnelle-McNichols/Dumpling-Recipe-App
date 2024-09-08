import { Text, View, Image, Pressable, TouchableOpacity } from "react-native";
import styles from "../styles/styles";
import { Link } from "expo-router";
import { ThemedView } from "@/components/ThemedView";

const logo = require("../assets/images/Dumpling.png");
const mascot = require("../assets/images/mascot.png")

export default function Welcome() {

  return (
    <Link href="/login">
    <View style={styles.container}>
        <Image source={logo} style={styles.mainLogo} />
        <Image source={mascot}/>
    </View>
    </Link>
  );
}


// import { Text, View, Image, TouchableOpacity } from "react-native";
// import styles from "../styles/styles";
// import { useNavigation } from '@react-navigation/native'; // Import useNavigation

// const logo = require("../assets/images/Dumpling.png");
// const mascot = require("../assets/images/mascot.png");

// export default function Welcome() {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <Image source={logo} style={styles.mainLogo} />
//       <Image source={mascot} />
//       <TouchableOpacity onPress={() => navigation.navigate('GroceryList')}>
//         <Text style={styles.btn_main}>Go to Grocery List</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
