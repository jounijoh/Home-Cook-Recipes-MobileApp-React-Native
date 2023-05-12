import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Recipe } from '../types/types';
import { getDatabase, ref, onValue, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Button } from '@rneui/themed';


export const FavoriteRecipesScreen = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const userId = auth.currentUser?.uid;
  
  const getFavoriteRecipes = async (userId: string) => {
    const database = getDatabase();
    const favRef = ref(database, `users/${userId}/favourites`);

    setLoading(true);
    try {
      const snapshot = await get(favRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        //console.log("Firebase data:", data);
        const recipesArray = Object.keys(data).map((key) => data[key]);
        setFavoriteRecipes(recipesArray);
      } else {
        setFavoriteRecipes([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    console.log(favoriteRecipes);
  };


  useEffect(() => {
    if (userId) {
      getFavoriteRecipes(userId);
    }
  }, [userId]);

  const renderItem = ({ item }) => (
    <View style={styles.recipeContainer}>
      <Text style={styles.recipeTitle}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button onPress={() => getFavoriteRecipes(userId)}>GETSOME</Button>
      <FlatList
        data={favoriteRecipes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  recipeContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

