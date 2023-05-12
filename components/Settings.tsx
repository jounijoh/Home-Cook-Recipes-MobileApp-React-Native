import React from "react";
import { Modal, TouchableOpacity, Text, Pressable, View, StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { getAuth, signOut } from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";

const auth = getAuth();


// NOT IN USE AT ALL ATM
export const Settings = ({ modalVisible, setModalVisible }) => {

  return (
    <View>
      <Pressable onPress={() => setModalVisible(true)}>
        <Feather name="menu" color="gray" size={24} />
      </Pressable>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={styles.modalBackground}
        >
          <View style={styles.modalContent}>
            <LinearGradient
              colors={["#141e30", "#243b55"]}
              style={styles.linearGradient}
            >
              <Pressable onPress={() => signOut(auth)}>
                <View style={styles.logoutContent}>
                  <Feather name="log-out" color="white" size={24} />
                  <Text style={styles.logoutText}>Logout</Text>
                </View>
              </Pressable>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    height: "30%",
    marginTop: "auto",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  linearGradient: {
    flex: 1,
    borderRadius: 20,
  },
  logoutContent: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
  },
  logoutText: {
    color: "white",
    fontSize: 18,
    marginLeft: 8,
  },
});


