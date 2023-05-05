import React from 'react';
import { Button,  useTheme } from '@rneui/themed';
import { FlatList, View } from 'react-native';
import { Recipe } from '../../../types/types';
import { renderRecipeItem } from './RecipeItemComp';


interface RecipeListProps {
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
  onRecipePress: (recipe: Recipe) => void;
}

export const RecipeList: React.FC<RecipeListProps> = ({ recipes, setRecipes, onRecipePress }) => {

  const { theme } = useTheme();
  
  const list = recipes

  return (
    <View>
      <Button title="Clear Recipes" type="clear" size='sm' color={theme.colors.grey2} onPress={() => setRecipes([])}/>
    <FlatList
      data={recipes}
      renderItem={(props) => renderRecipeItem({ ...props, onRecipePress })}
      keyExtractor={(item, index) => index.toString()}
    />
    </View>
  );
};