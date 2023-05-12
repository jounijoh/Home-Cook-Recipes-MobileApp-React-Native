import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteProp } from '@react-navigation/native'

export type Recipe = {
  userId?: string,
  name: string,
  description: string
  instructions?: string
  shoppingList?: string
}

export type StackParamList = {
    Home: undefined;
    Search: undefined;
    FindRecipes: undefined;
    Instructions: undefined;
  }

 export type HomepageNavigationProp = NativeStackNavigationProp<StackParamList, 'Home'>
 export type HomepageRouteProp = RouteProp<StackParamList, 'Home'>

 export type FindRecipesNavigationProp = NativeStackNavigationProp<StackParamList, 'Search'>
 export type FindRecipesRouteProp = RouteProp<StackParamList, 'Search'>