import { Text, View, Image, Pressable, TouchableOpacity} from "react-native";
import styles from "../styles/styles";
import { Link } from "expo-router";
const logo = require("../assets/images/Dumpling.png");

export default function Welcome() {

  return (<>

      <View style={styles.container}>
        <Image source={logo} />
        <View >
        <Link href="/signup" asChild><TouchableOpacity style={styles.btn_main}><Text style={styles.whitefont} >Signup</Text></TouchableOpacity></Link>
        <Link href="/login" asChild><TouchableOpacity style={styles.btn_sec}><Text style={styles.colorfont} >Login</Text></TouchableOpacity></Link>
      </View>
      </View>
     

  </>
  );
}


