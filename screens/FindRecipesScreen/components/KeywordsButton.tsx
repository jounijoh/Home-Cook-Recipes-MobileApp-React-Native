import React from 'react';
import { Button, useTheme  } from '@rneui/themed';


interface KeywordButtonProps {
  isSelected: boolean;
  onPress: () => void;
  title: string;
}

export const KeywordButton: React.FC<KeywordButtonProps> = ({ isSelected, onPress, title }) => {
  const { theme } = useTheme();

  const buttonStyle = {
    flex: 1,
    borderRadius: 15,
    backgroundColor: isSelected ? theme.colors.primary : 'gray',
    margin: 5,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  };

  return (

    <Button
      title={title}
      buttonStyle={buttonStyle}
      onPress={onPress}
    />
    
  );

};

