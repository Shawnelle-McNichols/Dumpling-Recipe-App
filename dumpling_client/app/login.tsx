import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "../styles/styles";
import React, { useState } from "react";
import { Link } from "expo-router";

const logo = require("../assets/images/Dumpling.png");

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Email', email);
    console.log('Password', password);
  }
  return (
    <View style={styles.container}>
      <Image source={logo} />
      <Text style={styles.header}>Login</Text>
      <Text>Don't have an account? <Link href="/signup">Sign up</Link></Text>
      <View style={styles.form_group}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address" />
      </View>
      <View style={styles.form_group}>
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input}
          value={password}
          onChangeText={setPassword} 
          secureTextEntry/>
      </View>
      <View style={styles.form_group}>
        <TouchableOpacity style={styles.btn_main_md} onPress={handleLogin}><Text style={styles.whitefont}>Login</Text></TouchableOpacity>
      </View>

    </View>
  );

}