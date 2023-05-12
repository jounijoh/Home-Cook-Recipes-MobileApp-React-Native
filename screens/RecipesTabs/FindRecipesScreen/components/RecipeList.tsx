import React from 'react';
import { Button, useTheme } from '@rneui/themed';
import { FlatList, View } from 'react-native';
import { Recipe } from '../../../../types/types';
import { renderRecipeItem } from './RecipeItemComp';


interface RecipeListProps {
  recipes: Recipe[];
  showButtons: boolean
  setShowButtons: React.Dispatch<React.SetStateAction<boolean>>
  onRecipePress: (recipe: Recipe) => void;
}

export const RecipeList: React.FC<RecipeListProps> = ({
  recipes,
  showButtons,
  setShowButtons,
  onRecipePress,
}) => {

  const { theme } = useTheme();

  const list = recipes

  // Show or hide search bar and buttons
  const toggleSearchBar = () => {
    setShowButtons(prevShowButtons => !prevShowButtons);
  };

  return (
    <View>
      {showButtons && (
        <Button
          title="Hide Search"
          type="clear" size='sm'
          color={theme.colors.grey2}
          onPress={toggleSearchBar}
        />
      )}
      {!showButtons && (
        <Button
          title="Show Search"
          type="clear" size='sm'
          color={theme.colors.grey2}
          onPress={toggleSearchBar}
        />
      )}
      <FlatList
        data={recipes}
        renderItem={(props) => renderRecipeItem({ ...props, onRecipePress })}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};