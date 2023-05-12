import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useTheme, Button } from '@rneui/themed';
import { Recipe } from '../../types/types';


interface ShoppingListScreenProps {
  selectedRecipe?: Recipe;
}

export const FavoriteShoppingListScreen: React.FC<ShoppingListScreenProps> = ({
  selectedRecipe,
}) => {
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();


  const addToQuickList = async (recipe: Recipe) => {
    console.log(recipe)
    if (!recipe) {
        console.log("No recipe selected.");
        return;
        }
    //add to quicklist here
  }

  return (
    <ScrollView style={theme.screenContainer} contentContainerStyle={{paddingBottom: 120}} >
      {selectedRecipe && selectedRecipe.name ? (
        <>
          <View style={styles.recipeHeader}>
            <Text style={styles.title}>Shopping List for {selectedRecipe.name}</Text>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loading} />
          ) : (
            <>
            <Text style={styles.shoppingList}>{selectedRecipe.shoppingList}</Text>
            <Button title="Add to QuickList" onPress={() => addToQuickList(selectedRecipe)} />
            </>
          )}
        </>
      ) : (
        <Text>No Recipe Selected</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'KleeOne-SemiBold',
    lineHeight: 20,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  shoppingList: {
    fontSize: 16,
    marginBottom: 20,
  },
  loading: {
    marginTop: 10,
  },
});
