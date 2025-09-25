import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Image, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const ChatRoom = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { roomId } = route.params;

  const [messages, setMessages] = useState([
    { id: "1", text: "ยินดีต้อนรับเข้าสู่ห้อง!", sender: "System" },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (inputText.trim() === "") return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: "You",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.roomTitle}>Chat Room: {roomId}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.profileButton}>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/147/147144.png" }}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={item.sender === "You" ? styles.myMessage : styles.otherMessage}>
            <Text style={styles.messageText}>{item.sender}: {item.text}</Text>
          </View>
        )}
        style={styles.messageList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="พิมพ์ข้อความ..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendText}>ส่ง</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121222" },

  // Header
  header: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    paddingVertical: 20, paddingHorizontal: 15, backgroundColor: "#1e1e2e",
  },
  backButton: { backgroundColor: "#354F7C", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  backText: { color: "#fff", fontWeight: "bold" },
  roomTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  profileButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#FFA500", justifyContent: "center", alignItems: "center" },
  profileIcon: { width: 30, height: 30 },

  // Chat messages
  messageList: { flex: 1, paddingBottom: 60 }, // เพิ่มระยะห่างจาก input
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007bff", 
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: "80%",
    marginLeft: 60, 
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#444", 
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: "80%",
    marginRight: 60, 
  },
  messageText: { color: "#fff" },

  // Input section
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#333",
    paddingVertical: 8,
    backgroundColor: "#1e1e2e", 
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#2c2c2c",
    padding: 10,
    borderRadius: 10,
    color: "#fff",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  sendText: { color: "#fff", fontWeight: "bold" },

  // Bottom navigation
  bottomNav: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 10, backgroundColor: "#1e1e2e" },
  navItem: { padding: 10 },
  navText: { color: "#ccc", fontSize: 16 },
  active: { color: "#fff", fontWeight: "bold" },
});

export default ChatRoom;