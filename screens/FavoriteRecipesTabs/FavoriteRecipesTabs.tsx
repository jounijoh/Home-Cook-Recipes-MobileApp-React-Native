import React, { useState, } from 'react';
import { Tab, Text, TabView } from '@rneui/themed';
import { FavoriteRecipesScreen } from './FavoriteScreen';
import { FavoriteInstructionsScreen } from './FavoriteInstructionsScreen';
import { Recipe } from '../../utils/openaiStream';
import { FavoriteShoppingListScreen } from './FavoriteShoppingListScreen';


// TAB FOR FAVORITE RECIPES, INSTRUCTIONS, SHOPPING LIST
export const FavoriteRecipesTabs = () => {

    const [index, setIndex] = useState(0);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [instructions, setInstructions] = useState('');
    const [shoppingList, setShoppingList] = useState('');

    const handleRecipePressToInstructions = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
        setIndex(1); // navigate to instructions
    };
    const handleRecipePressToShoppinglist = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
        setIndex(2); // navigate to instructions
    };

    const handleInstructionsUpdate = (instructions: string) => {
        setInstructions(instructions);
    };

    const handleNavigateToShoppingList = () => {
        setIndex(2);
    };



    return (
        <>
            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    backgroundColor: 'white',
                    height: 3,
                }}
                variant="primary"
            >
                <Tab.Item
                    title="Favorites"
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
                />
                <Tab.Item
                    title="Instructions"
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'book', type: 'ionicon', color: 'white' }}
                />
                <Tab.Item
                    title="Shopping List"
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
                />
              
            </Tab>

            <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item style={{ width: '100%' }}>
                    <FavoriteRecipesScreen 
                    onPressToInstructions={handleRecipePressToInstructions}
                    onPressToShoppingList={handleRecipePressToShoppinglist}
                     />
                </TabView.Item>
                <TabView.Item style={{ width: '100%' }}>
                    <FavoriteInstructionsScreen
                        selectedRecipe={selectedRecipe}
                        onNavigateToShoppingList={handleNavigateToShoppingList}
                    />
                </TabView.Item>
                <TabView.Item style={{ width: '100%' }}>
                    <FavoriteShoppingListScreen
                        selectedRecipe={selectedRecipe}
                    />
                </TabView.Item>
            </TabView>
        </>
    );
};
