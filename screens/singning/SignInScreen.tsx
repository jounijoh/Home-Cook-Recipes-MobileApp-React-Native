import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, useTheme } from "@rneui/themed";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = getAuth();


const SignInScreen = () => {
  const { theme } = useTheme();

  const [value, setValue] = useState({
    email: '',
    password: '',
    error: ''
  })

  // load email from AsyncStorage
  useEffect(() => {
    async function loadEmail() {
      const savedEmail = await AsyncStorage.getItem('email');
      if (savedEmail) {
        setValue((prevState) => ({ ...prevState, email: savedEmail }));
      }
    }
    loadEmail();
  }, []);

  async function signIn() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
      await AsyncStorage.setItem('email', value.email); // save email to AsyncStorage
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      })
    }
  }

  return (
    <SafeAreaProvider>
    <View style={styles.container}>
      <Text>Please enter you Email and Password </Text>

      {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

      <View style={styles.controls}>
        <Input
          placeholder='Email'
          containerStyle={styles.control}
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
          inputStyle={{ color: theme.colors.secondary }}
          leftIcon={<Icon
            name='envelope'
            size={16}
          />}
        />

        <Input
          placeholder='Password'
          containerStyle={styles.control}
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
          inputStyle={{ color: theme.colors.secondary }}
          leftIcon={<Icon
            name='key'
            size={16}
          />}
        />

        <Button title="Sign in" buttonStyle={styles.control} onPress={signIn} />
      </View>
    </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '80%',
    color: 'black',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  controls: {
    flex: 1,
    color: 'black',
  },

  control: {
    marginTop: 10,
    width: 300,
    color: 'black',
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: 'black',
    backgroundColor: '#D54826FF',
  }
});

export default SignInScreen;