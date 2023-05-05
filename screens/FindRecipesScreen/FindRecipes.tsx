import React, { useRef, useState } from 'react';
import { Button, useTheme, Input } from '@rneui/themed';
import { View, Text, StyleSheet, FlatList, TextInput, ActivityIndicator } from 'react-native';
import { Icon, BottomSheet } from '@rneui/base';
import { Recipe, fetchAnswer } from '../../utils/openaiStream';
import { RecipeList } from './components/RecipeList';
import { SearchBar } from './components/SearchBar';
import { KeywordsList } from './components/KeyWordsList';

interface FindRecipesScreenProps {
  onPress: (recipe: Recipe) => void;
}

export const FindRecipesScreen: React.FC<FindRecipesScreenProps> = ({ onPress }) => {

  const [textInput, setTextInput] = useState('');
  const [selectedButtons, setSelectedButtons] = useState<Set<string>>(new Set());
  const { theme } = useTheme();

  const buttons = [
    'Meat', 'Dessert', 'Breakfast', 'Vegetarian',
    'Lunch', 'Dinner', 'Snack', 'One Pot Meal',
    'Healthy', 'Comfort food', 'Vegan', 'Pasta',
    'Soup', 'Salad', 'Bread', 'Side Dish'
  ];


  const findRecipes = () => {

    const selectedItems = Array.from(selectedButtons); // convert the Set to an array
    // add the text input to the array if it is not empty
    if (textInput.length > 0) {
      selectedItems.push(textInput);
    }
    // join the array elements into a string
    const searchValue = selectedItems.join(', '); // join the array elements into a string
    setTextInput('');
    fetchRecipes(searchValue);

  };

  // HANDLE BUTTON PRESS AND CHANGE BUTTON COLOR
  const handlePress = (value: string) => {
    setSelectedButtons(prevSelectedButtons => {
      const newSelectedButtons = new Set(prevSelectedButtons);
      if (newSelectedButtons.has(value)) {
        newSelectedButtons.delete(value);
      } else {
        newSelectedButtons.add(value);
      }
      return newSelectedButtons;
    });
  };

  const keywordsListRef = useRef<FlatList | null>(null);


  // GET ANSWER FROM API AND MAP IT TO AN OBJECT
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const fetchRecipes = async (userPrompt: string) => {

    const systemPrompt = "You are homecook. Give List of 5 recipes as a list with Recipe name and single sentence description. "

    try {

      setLoading(true)


      const content = await fetchAnswer(systemPrompt, userPrompt)

      if (!content) {
        console.log("Error while fetching recipes")
        return
      }

      const listOfRecipes: string[] = content.split(/\s*\d+\.\s*/).slice(1)

      const recipeObjects = listOfRecipes.map(item => {
        const [name, ...descriptionParts] = item.split(' - ');
        const description = descriptionParts.join(' - ');
        return { name, description };
      });

      setRecipes(recipeObjects)
      console.log(recipes)
      setSelectedRecipe(recipeObjects[0]) // automaticly selected the first recipe

    } catch (error: any) {
      console.log(error.message)
    } finally {
      setLoading(false)

    }
  }



  return (
    <View style={theme.screenContainer}>
      <Text>Please select or add key words to find recipes of your liking</Text>
      <View>
      <KeywordsList buttons={buttons} selectedButtons={selectedButtons} handlePress={handlePress} />    
      <SearchBar textInput={textInput} setTextInput={setTextInput} findRecipes={findRecipes}/>
      </View>
      {loading && (
        <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loading} />
      )}
      {recipes.length > 0 && (
      <RecipeList recipes={recipes} setRecipes={setRecipes} onRecipePress={onPress}/>
      )}
      </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    marginTop: 10,
  },
});

