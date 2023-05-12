
import HomeScreen from '../screens/HomeScreen';
import { RecipesTabs } from '../screens/RecipesTabs/RecipesTabs';
import { Entypo } from '@expo/vector-icons';
import React from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProfileScreen from '../screens/Profile';
import { FavoriteRecipesScreen } from '../screens/FavoriteScreen';
import { useTheme } from '@rneui/themed';
import { FavoriteRecipesTabs } from '../screens/FavoriteRecipesTabs/FavoriteRecipesTabs';



export const BottomTab = () => {
  const theme = useTheme();
  const _renderIcon = (routeName: string, selectedTab: string) => {
    let icon = '';

    switch (routeName) {
      case 'home':
        icon = 'ios-home-outline';
        break;
      case 'RecipesTabs':
        icon = 'search-outline';
        break;
      case 'FavoriteRecipes':
        icon = 'heart-outline';
        break;
      case 'Profile':
        icon = 'person-outline';
        break;
    }

    return (
      <Ionicons
        name={icon as any}
        size={25}
        color={routeName === selectedTab ? 'black' : 'gray'}
      />
    );
  };
  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => {
            navigate(routeName);
        }}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };
 


  return (
    <>
      <CurvedBottomBarExpo.Navigator
        type="DOWN"
        style={styles.bottomBar}
        shadowStyle={styles.shawdow}
        height={55}
        circleWidth={50}
        bgColor="white"
        circlePosition='LEFT'
        initialRouteName="title1"
        borderTopLeftRight
        renderCircle={({ selectedTab, navigate }) => (
          <Animated.View style={styles.btnCircleUp}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Alert.alert('Click Action')}
            >
              <Entypo name="menu" size={24} color="black" />
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}
      >
        <CurvedBottomBarExpo.Screen
          name="home"
          position="LEFT"
          component={() => <HomeScreen navigation={navigator} />}
        />
        <CurvedBottomBarExpo.Screen
          name="RecipesTabs"
          position="LEFT"
          component={({ route }) => (
            <RecipesTabs route={route} />
          )}
          options={{ headerShown: false }}
        />
        <CurvedBottomBarExpo.Screen
          name="FavoriteRecipes"
          component={() => <FavoriteRecipesTabs />}
          position="RIGHT"
        />
        <CurvedBottomBarExpo.Screen
          name="Profile"
          component={() => <ProfileScreen navigation={navigator} />}
          position="RIGHT"

        />
      </CurvedBottomBarExpo.Navigator>
   
    </>

  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {
  },
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
    bottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: '#BFEFFF',
  },
  screen2: {
    flex: 1,
    backgroundColor: '#FFEBCD',
  },
});