import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { KeywordButton } from './KeywordsButton';

interface KeywordsListProps {
  buttons: string[];
  selectedButtons: Set<string>;
  handlePress: (value: string) => void;
}

export const KeywordsList: React.FC<KeywordsListProps> = ({ buttons, selectedButtons, handlePress }) => {
  const numColumns = 4;

  const renderItem = ({ item, index }) => {
    const isSelected = selectedButtons.has(item);
    return (
      <KeywordButton
        key={index}
        isSelected={isSelected}
        onPress={() => handlePress(item)}
        title={item}
      />
    );
  };

  return (
    <FlatList
      data={buttons}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={numColumns}
      columnWrapperStyle={styles.row}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
