import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme, Button } from '@rneui/themed';
import { Recipe } from '../../types/types';
import { fetchAnswer } from '../../utils/openaiStream';
import { getDatabase, ref, set, onValue, push } from 'firebase/database';

interface ShoppingListScreenProps {
  selectedRecipe?: Recipe;
  setSelectedRecipe: (recipe: Recipe) => void;
  instructions: string;
}

export const ShoppingListScreen: React.FC<ShoppingListScreenProps> = ({
  selectedRecipe,
  setSelectedRecipe,
  instructions
}) => {

  const [shoppingList, setShoppingList] = useState('');
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  const getShoppingList = async () => {
    const systemMessage = 'Write me a shopping list for the given recipe. Write the list in a way that items are sorted according to which department they can be found in the store';

    if (!instructions) {
      console.log('No Recipe Selected for Shopping list');
      return;
    }
    const prompt = instructions;
    const content = await fetchAnswer(systemMessage, prompt);

    if (!content) {
      console.log('Error while fetching shopping list');
      return;
    }

    setShoppingList(content);
    setSelectedRecipe({ ...selectedRecipe, shoppingList: content });
    setLoading(false);
  };

  // Fetch the shopping list when the instructions change
  useEffect(() => {
    getShoppingList();
  }, [instructions]);

  // If no recipe is selected, display a message
  if (!instructions) {
    return (
      <View >
        <Text style={styles.title}>No recipe selected. Please select a recipe from the "Instructions" tab.</Text>
      </View>
    );
  }

  // Add the recipe to the user's favourites firebase database
  const addToFavourites = async (recipe: Recipe) => {
    console.log(recipe)
    if (!recipe) {
      console.log("No recipe selected.");
      return;
    }
  
    const database = getDatabase();
  
    const favRef = ref(database, `users/${recipe.userId}/favourites/${recipe.name}`);
  
    // Check if the recipe already exists in the user's favourites
    onValue(favRef, (snapshot) => {
      if (!snapshot.exists()) {
        // If the recipe doesn't exist, save it to the user's favourites
        set(favRef, recipe)
          .then(() => {
            console.log("Recipe added to favourites.");
          })
          .catch((error) => {
            console.error("Error adding recipe to favourites: ", error);
          });
      } else {
        console.log("Recipe already exists in favourites.");
      }
    });
  };

  return (
    <View style={theme.screenContainer}>
    <View style={styles.recipeHeader}>
      <Text style={styles.title}>Shopping List for {selectedRecipe.name}</Text>
      <Button title="Add to Favourites" onPress={() => addToFavourites(selectedRecipe)} />
    </View>
    {loading ? (
      <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loading} />
    ) : (
      <Text style={styles.shoppingList}>{selectedRecipe.shoppingList}</Text>
    )}
  </View>
  );
};

const styles = StyleSheet.create({
  recipeHeader: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'KleeOne-SemiBold',
    lineHeight: 35,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  shoppingList: {
    fontFamily: 'KleeOne-SemiBold',
    lineHeight: 20,
    fontSize: 16,
  },
  loading: {
    marginTop: 10,
  },
});
