import { Button, Icon } from '@rneui/themed';
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface SearchBarProps {
  textInput: string;
  setTextInput: (value: string) => void;
  findRecipes: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ textInput, setTextInput, findRecipes }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchBar}
        value={textInput}
        onChangeText={setTextInput}
        placeholder="Enter a keyword..."
      />
        <Button
        radius={'lg'}
        type="solid"
        onPress={() => findRecipes()}
        containerStyle={styles.addButton}
        title={`Find Recipes`}
        icon={<Icon name="search" color="white" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  addButton: {
    paddingLeft: 10,
  },
});
