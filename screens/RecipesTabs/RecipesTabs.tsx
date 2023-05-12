import React, { useState, } from 'react';
import { Tab, Text, TabView } from '@rneui/themed';
import { FindRecipesScreen } from './FindRecipes';
import { InstructionsScreen } from './InstructionsScreen';
import { Recipe } from '../../utils/openaiStream';
import { ShoppingListScreen } from './ShoppingListScreen';


// TAB TO FIND RECIPES, INSTRUCTIONS, SHOPPING LIST, FAVORITES
export const RecipesTabs = ({ route }) => {
    const initialTabIndex = route.params?.initialTabIndex || 0;
    const [index, setIndex] = useState(initialTabIndex);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
    const [instructions, setInstructions] = useState('');
    const [fetches, setFetches] = useState(0);

    const handleRecipePress = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
        setIndex(1);
        const fetchesNow = fetches + 1;
        setFetches(fetchesNow);
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
                    title="Find Recipes"
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'search', type: 'ionicon', color: 'white' }}
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
                    <FindRecipesScreen onPress={handleRecipePress} />
                </TabView.Item>
                <TabView.Item style={{ width: '100%' }}>
                    <InstructionsScreen
                        selectedRecipe={selectedRecipe}
                        setSelectedRecipe={setSelectedRecipe}
                        onInstructionsUpdate={setInstructions}
                        onNavigateToShoppingList={handleNavigateToShoppingList}
                        onRecipeSelected={handleRecipePress}
                        fetches={fetches}
                    />
                </TabView.Item>
                <TabView.Item style={{ width: '100%' }}>
                    <ShoppingListScreen
                        selectedRecipe={selectedRecipe}
                        instructions={instructions}
                        setSelectedRecipe={setSelectedRecipe}
                    />
                </TabView.Item>
            </TabView>
        </>
    );
};
