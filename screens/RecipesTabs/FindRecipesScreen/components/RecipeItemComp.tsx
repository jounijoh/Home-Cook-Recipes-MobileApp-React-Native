
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Recipe } from '../../../../types/types';

interface RecipeItemProps {
  item: Recipe;
  onRecipePress: (recipe: Recipe) => void;
}

export const renderRecipeItem: React.FC<RecipeItemProps> = ({ item, onRecipePress }) => {
  const onPressFunction = () => {
    onRecipePress(item);
  };


  return (
    <Pressable onPress={onPressFunction}>
      {({ pressed }) => (
        <View style={styles.recipeItemContainer}>
          <Text style={styles.recipeName}>
             {item.name}
          </Text>
            <Text style={styles.recipeDescription}>
              {pressed ? 'GET RECIPE' : item.description}
            </Text>
     
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({

  recipeItemContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recipeDescription: {
    fontSize: 14,
  },
});