import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "../styles/styles";
import React, { useState } from "react";
import { Link } from "expo-router";

const logo = require("../assets/images/Dumpling.png");
export default function Welcome() {
  return(
    <View style={styles.container}>
      <Image source={logo} />
    </View>
  );
}


