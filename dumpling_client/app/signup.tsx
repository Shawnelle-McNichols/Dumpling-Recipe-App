import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "../styles/styles";
import React, { useState } from "react";
import { Link } from "expo-router";

const logo = require("../assets/images/Dumpling.png");

export default function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    console.log('Email', email);
    console.log('Username', username);
    console.log('Password', password);

    
  }
  return (
    <View style={styles.container}>
      <Image source={logo} />
      <Text style={styles.header}>Sign up</Text>
      <Text>Already have an account? <Link href="/login">Login</Link></Text>
      <View style={styles.form_group}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address" />
      </View>
      <View style={styles.form_group}>
        <Text style={styles.label}>Usename</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}/>
      </View>
      <View style={styles.form_group}>
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input}
          value={password}
          onChangeText={setPassword} 
          secureTextEntry/>
      </View>
      <View style={styles.form_group}>
        <TouchableOpacity style={styles.btn_main_md} onPress={handleSignup}><Text style={styles.whitefont}>Sign up</Text></TouchableOpacity>
      </View>

    </View>
  );

}