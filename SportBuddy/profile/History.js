import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";


const History = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Basketball Feed 🏆</Text>
      <Text style={styles.details}>Liverpool UEFA Champion League Celebration 🎉</Text>
      <Text style={styles.time}>Yesterday, 06:30 PM</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.backButtonText}>🔙 Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    color: "#ddd",
    textAlign: "center",
    marginBottom: 5,
  },
  time: {
    fontSize: 14,
    color: "#bbb",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#E74C3C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default History;
