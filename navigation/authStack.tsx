import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/welcome';
import SignInScreen from '../screens/singning/SignInScreen';
import SignUpScreen from '../screens/singning/SingUpScreen';
import { useTheme } from '@rneui/themed';

const Stack = createStackNavigator();

export default function AuthStack() {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
             cardStyle: {
            backgroundColor: '#0e1529'
          },
          headerShown: false
        }}>
        <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen} 
       
          />
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}