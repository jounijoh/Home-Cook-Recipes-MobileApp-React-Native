import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme, Button } from '@rneui/themed';
import { Recipe } from '../../types/types';
import { fetchAnswer } from '../../utils/openaiStream';


interface InstructionsScreenProps {
  selectedRecipe?: Recipe;
  setSelectedRecipe: (recipe: Recipe) => void;
  onInstructionsUpdate: (instructions: string) => void;
  onNavigateToShoppingList: () => void;
  onRecipeSelected: (recipe: Recipe) => void;
  fetches: number;
}

export const InstructionsScreen: React.FC<InstructionsScreenProps> = ({
  selectedRecipe,
  setSelectedRecipe,
  onInstructionsUpdate,
  onNavigateToShoppingList,
  fetches
}) => {  
  
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  const getInstructions = async () => {

    try {
      setLoading(true);

      if (!selectedRecipe) {
        console.log("No recipe selected");
        return;
      }

      const systemPrompt = "You are homecook. Give cooking instructions to the given recipe for four servings in metric units and use decimals insted of cups ";
      
      const userPrompt = selectedRecipe.name + "" + selectedRecipe.description;

      const content = await fetchAnswer(systemPrompt, userPrompt);

      if (!content) {
        console.log("Error while fetching instructions");
        return;
      }

      if (selectedRecipe) {
        const updatedRecipe = { ...selectedRecipe, instructions: content };
        setSelectedRecipe(updatedRecipe);
        onInstructionsUpdate(content);
      }

    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch instructions when recipe is selected
  // and instructions are not fetched yet
  useEffect(() => {
      getInstructions();
  }, [fetches]);
  
  

  if (!selectedRecipe) {
    return (
      <View >
        <Text style={styles.title}>No recipe selected. Please select a recipe from the "Find Recipes" tab.</Text>
      </View>
    );
  }


  return (
    <ScrollView style={theme.screenContainer} contentContainerStyle={{paddingBottom: 120}}>
      <Text style={styles.text}>Instructions for</Text>
      <Text style={styles.title}>{selectedRecipe.name}</Text>
      {loading ? (
        <View>
        <Text style={{textAlign: 'center'}}>Please wait while I think how to make it</Text>
        <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loading} />
        </View>
      ) : (
        <>
          <Text style={styles.instructions}>{selectedRecipe.instructions}</Text>
          
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title:{
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    },
  instructions: {
    marginTop: 20,
    fontSize: 16,
  },
  loading: {
    marginTop: 40,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  }
});
