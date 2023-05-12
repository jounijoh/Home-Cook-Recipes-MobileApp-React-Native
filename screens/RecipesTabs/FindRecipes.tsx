import React, { useRef, useState, useCallback } from 'react';
import { Button, useTheme, Input } from '@rneui/themed';
import { View, ScrollView, Text, StyleSheet, FlatList, TextInput, ActivityIndicator } from 'react-native';
import { fetchAnswer, Recipe } from '../../utils/openaiStream';
import { RecipeList } from './FindRecipesScreen/components/RecipeList';
import { SearchBar } from './FindRecipesScreen/components/SearchBar';
import { KeywordsList } from './FindRecipesScreen/components/KeyWordsList';
import { getAuth } from 'firebase/auth';

interface FindRecipesScreenProps {
  onPress: (recipe: Recipe) => void;
}

export const FindRecipesScreen: React.FC<FindRecipesScreenProps> = ({ onPress }) => {

  const [textInput, setTextInput] = useState('');
  const [selectedButtons, setSelectedButtons] = useState<Set<string>>(new Set());
  const { theme } = useTheme();
  const [showButtons, setShowButtons] = useState(true);

  const buttons = [
    'Meat', 'Dessert', 'Breakfast', 'Vegetarian',
    'Lunch', 'Dinner', 'Snack', 'One Pot Meal',
    'Healthy', 'Comfort food', 'Vegan', 'Pasta',
    'Soup', 'Salad', 'Bread', 'Side Dish'
  ];

  // get user id
  const auth = getAuth();
  const userId = auth.currentUser?.uid;


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

    const systemPrompt = "You are homecook."
    try {
      setLoading(true)
      userPrompt = 
      "Give List of 5 recipes as a list with Recipe name '-' and single sentence description."
      + userPrompt  
      const content = await fetchAnswer(systemPrompt, userPrompt)

      if (!content) {
        console.log("Error while fetching recipes")
        return
      }

      // split the content into an array of recipes
      const listOfRecipes: string[] = content.split(/\s*\d+\.\s*/).slice(1)

      const recipeObjects = listOfRecipes.map(item => {
        const [name, ...descriptionParts] = item.split(' - ');
        const description = descriptionParts.join(' - ');
        return { name, description, userId };
      });

      setRecipes(recipeObjects)
      setShowButtons(false)
      console.log(recipes)

    } catch (error: any) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }
 
  const handleRecipePress = useCallback(
    (recipe: Recipe) => {
      onPress(recipe);
    },
    [onPress]
  );

  return (
    <View style={theme.screenContainer}>
      <View>
        <Text style={styles.text}>Please select or add key words to find recipes of your liking</Text>
        {showButtons && (
          <View>
            <KeywordsList buttons={buttons} selectedButtons={selectedButtons} handlePress={handlePress} />
            <SearchBar textInput={textInput} setTextInput={setTextInput} findRecipes={findRecipes} />
          </View>
        )}
      </View>
      {loading && (
        <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loading} />
      )}

        <RecipeList 
          recipes={recipes}
          showButtons={showButtons}
          setShowButtons={setShowButtons}
          onRecipePress={handleRecipePress}
        />
        
         {recipes.length > 0 && (
        <Button 
          title="Find More Recipes" 
          onPress={findRecipes}
        />
      )}
  
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});

