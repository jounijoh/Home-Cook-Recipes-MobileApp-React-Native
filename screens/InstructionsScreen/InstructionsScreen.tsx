import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme, Button } from '@rneui/themed';
import { Recipe } from '../../types/types';
import { fetchAnswer } from '../../utils/openaiStream';


interface InstructionsScreenProps {
  selectedRecipe?: Recipe;
  onInstructionsUpdate: (instructions: string) => void;
  onNavigateToShoppingList: () => void;
}

export const InstructionsScreen: React.FC<InstructionsScreenProps> = ({
  selectedRecipe,
  onInstructionsUpdate,
  onNavigateToShoppingList,
}) => {  
  
  const [instructions, setInstructions] = useState('');
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

      setInstructions(content);
      onInstructionsUpdate(content);

    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInstructions();
  }, [selectedRecipe]);

  if (!selectedRecipe) {
    return (
      <View >
        <Text style={styles.title}>No recipe selected. Please select a recipe from the "Find Recipes" tab.</Text>
      </View>
    );
  }


  return (
    <View style={theme.screenContainer}>
      <Text>Instructions for</Text>
      <Text style={styles.title}>{selectedRecipe.name}</Text>
      {loading ? (
        <View>
        <Text>Please wait while I think how to make it</Text>
        <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loading} />
        </View>
      ) : (
        <>
          <Button title="Make Shopping List" onPress={() => onNavigateToShoppingList()} />
          <Text style={styles.instructions}>{instructions}</Text>
          
        </>
      )}
    </View>
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
});
