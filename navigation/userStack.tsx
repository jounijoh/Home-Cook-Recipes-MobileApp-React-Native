
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/welcome';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTab } from '../components/BottomTab';
import { useTheme } from '@rneui/themed';

const Stack = createStackNavigator();

export default function UserStack() {

  const theme = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={BottomTab} 
          />
    </Stack.Navigator>
    </NavigationContainer>
  );
}