import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuthentication } from '../utils/hooks/useAuthentication'; // Update the path to your hook
import { getAuth, signOut } from 'firebase/auth';
import { Button } from '@rneui/themed';

const ProfileScreen = ({ navigation }) => {
  const { user } = useAuthentication();
  const auth = getAuth();

  async function handleLogout() {
    try {
      await signOut(auth);
      //navigation.navigate('Welcome'); // Navigate to your Login screen after logging out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      {user && (
        <>
          <Text style={styles.userInfo}>
            Hello, {user.displayName || user.email}!
          </Text>
          <Button title="Log out"  onPress={handleLogout} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default ProfileScreen;
