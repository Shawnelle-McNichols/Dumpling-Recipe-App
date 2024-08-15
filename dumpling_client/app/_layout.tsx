import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
      name="index" 
      options={{headerShown:false}}/>
      <Stack.Screen name="login" 
      options={{
        headerBackVisible:true,
        headerTitle:"",
        headerStyle:{backgroundColor:"transparent"},
        headerTintColor:"#011627",
        headerBackTitleVisible:false,
        }}/>
      <Stack.Screen name="signup" 
      options={{
        headerBackVisible:true,
        headerTitle:"",
        headerStyle:{backgroundColor:"transparent"},
        headerTintColor:"#011627",
        headerBackTitleVisible:false,
        }}/>
    </Stack>
  );
}
