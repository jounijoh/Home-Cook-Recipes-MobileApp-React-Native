import { useTheme, Button } from "@rneui/themed";
import { useState } from "react";
import { View, ScrollView, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Recipe } from "../../types/types";

interface FavoriteInstructionsScreenProps {
    selectedRecipe?: Recipe;
    onNavigateToShoppingList: () => void;
    }


export const FavoriteInstructionsScreen: React.FC<FavoriteInstructionsScreenProps> = ({
    selectedRecipe,
     onNavigateToShoppingList
     }) => {

    const { theme } = useTheme();
    const [instructions, setInstructions] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInstructionsUpdate = (instructions: string) => {
        setInstructions(instructions);
    };

 

    return (
        <ScrollView style={theme.screenContainer} contentContainerStyle={{paddingBottom: 120}} >
        {selectedRecipe && selectedRecipe.name ? (
          <>
            <Text>Instructions for</Text>
            <Text style={styles.title}>{selectedRecipe.name}</Text>
            {loading ? (
              <View>
                <ActivityIndicator size="large" color={theme.colors.primary} style={styles.loading} />
              </View>
            ) : (
              <>
                <Text style={styles.instructions}>{selectedRecipe.instructions}</Text>
                <Button title="Go to Shopping List" onPress={() => onNavigateToShoppingList()} />
              </>
            )}
          </>
        ) : (
          <Text>No Recipe Selected</Text>
        )}
      </ScrollView>
      );
    
}
const styles = StyleSheet.create({
    title:{
      fontSize: 20,
      textAlign: 'center',
      marginTop: 20,
      },
    instructions: {
      marginTop: 20,
      fontSize: 16,
      marginBottom: 20,
    },
    loading: {
      marginTop: 40,
    },
  });
  