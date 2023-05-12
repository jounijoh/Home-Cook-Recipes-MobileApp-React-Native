import React, { useState } from 'react';
import { useTheme, Button } from '@rneui/themed';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import { useAuthentication } from '../utils/hooks/useAuthentication';

function HomeScreen({ navigation }) {
  const theme = useTheme();


  const { user } = useAuthentication();
  const displayName = user?.email || "User";

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to HomeCookBot,</Text>
        <Text style={styles.name}>{displayName}!</Text>
        <Text style={styles.text}>What would you like to cook today?</Text>
      </View>
      <ImageBackground style={styles.image}
        source={require('./images/homepage.png')}
        resizeMode="contain"

      >
      </ImageBackground>
      <SafeAreaView>

        <View style={styles.searchContainer}>
        <Text style={styles.textBottom}>Start by generating ideas for recipes </Text>
          <Button title="Generate Recipes" size='lg'
           onPress={() => navigation.navigate('RecipesTabs', { initialTabIndex: 0 })}
          />
        </View>

      </SafeAreaView>

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f8f2d4',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f2d4',
  },
  image: {
    flex: 0.75,
    justifyContent: "center",
    backgroundColor: '#f8f2d4',
  },
  header: {
    paddingTop: 50,
    backgroundColor: '#f8f2d4',
    alignItems: 'center',
    justifyContent: 'center',

  },
  title: {
    fontSize: 32,
    fontFamily: 'KleeOne-SemiBold',
    color: '#263a2e',
    paddingBottom: 10,
    paddingTop: 10,
    lineHeight: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#263a2e'
  },
  text: {
    fontFamily: 'KleeOne-SemiBold',
    fontSize: 20,
    lineHeight: 30,
    color: '#263a2e',
    //paddingBottom: 10,
  },
  textBottom: {
    fontFamily: 'KleeOne-SemiBold',
    fontSize: 20,
    lineHeight: 30,
    color: '#263a2e',
    paddingBottom: 20,
  },
  searchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#f8f2d4',
  },

});

export default HomeScreen;
