import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '@rneui/themed';
import { Recipe } from '../../types/types';
import { fetchAnswer } from '../../utils/openaiStream';

interface ShoppingListScreenProps {
  selectedRecipe?: Recipe;
  instructions: string;
}

export const ShoppingListScreen: React.FC<ShoppingListScreenProps> = ({ selectedRecipe, instructions }) => {
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
    setLoading(false);
  };

  useEffect(() => {
    getShoppingList();
  }, [instructions]);

  if (!instructions) {
    return (
      <View >
        <Text style={styles.title}>No recipe selected. Please select a recipe from the "Instructions" tab.</Text>
      </View>
    );
  }

  return (
    <View style={theme.screenContainer}>
      <Text>Shopping List for {selectedRecipe.name}</Text>
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loading} />
      ) : (
        <Text style={styles.shoppingList}>{shoppingList}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    },
  shoppingList: {
    fontSize: 16,
  },
  loading: {
    marginTop: 10,
  },
});
