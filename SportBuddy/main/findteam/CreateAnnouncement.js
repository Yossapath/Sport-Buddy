import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const CreateAnnouncement = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { updateAnnouncements } = route.params;

  const [fieldName, setFieldName] = useState("");
  const [description, setDescription] = useState("");
  const [currentPlayers, setCurrentPlayers] = useState(0);
  const [maxPlayers, setMaxPlayers] = useState(0);
  const [sportType, setSportType] = useState("");

  const handleSportSelect = (type) => {
    setSportType(type);
    const playerLimits = {
      Basketball: 6,
      Football: 11,
      Volleyball: 6,
    };
    setMaxPlayers(playerLimits[type] || 0);
    setCurrentPlayers(0);
  };

  const handleSubmit = () => {
    if (!sportType || !fieldName || !description || currentPlayers === 0) {
      Alert.alert("กรุณากรอกข้อมูลให้ครบถ้วนและจำนวนผู้เล่นต้องมากกว่า 0");
      return;
    }

    const newAnnouncement = {
      id: Math.random().toString(),
      sport: sportType,
      fieldName,
      maxPlayers,
      currentPlayers,
      description,
    };

    updateAnnouncements(newAnnouncement); // ส่งข้อมูลกลับไป Feed
    navigation.goBack(); // กลับหน้า Feed
  };

  const handlePlayerChange = (action) => {
    if (action === "increase" && currentPlayers < maxPlayers) {
      setCurrentPlayers(currentPlayers + 1);
    } else if (action === "decrease" && currentPlayers > 0) {
      setCurrentPlayers(currentPlayers - 1);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>ย้อนกลับ</Text>
      </TouchableOpacity>

      <Text style={styles.title}>สร้างประกาศ</Text>

      <TextInput
        style={styles.input}
        placeholder="ชื่อสนาม"
        value={fieldName}
        onChangeText={setFieldName}
      />
      <TextInput
        style={styles.input}
        placeholder="รายละเอียด"
        value={description}
        onChangeText={setDescription}
      />

      <View style={styles.playerInputContainer}>
        <Text style={styles.inputLabel}>จำนวนผู้เล่น</Text>
        <View style={styles.playerControls}>
          <TouchableOpacity
            style={styles.playerButton}
            onPress={() => handlePlayerChange("decrease")}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.currentPlayers}>{currentPlayers}</Text>
          <TouchableOpacity
            style={styles.playerButton}
            onPress={() => handlePlayerChange("increase")}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="จำนวนผู้เล่นสูงสุด"
        keyboardType="numeric"
        value={String(maxPlayers)}
        editable={false}
      />

      <View style={styles.sportButtons}>
        {["Football", "Basketball", "Volleyball"].map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.sportButton,
              sportType === type && styles.activeSportButton,
            ]}
            onPress={() => handleSportSelect(type)}
          >
            <Text style={styles.sportText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>สร้างประกาศ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  backButton: {
    marginTop: 20,
    alignSelf: "flex-start",
  },
  backButtonText: {
    color: "#00d09c",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 45,
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  inputLabel: {
    color: "#fff",
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  playerInputContainer: {
    marginBottom: 15,
  },
  playerControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  playerButton: {
    backgroundColor: "#3b3b5c",
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  currentPlayers: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  sportButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  sportButton: {
    backgroundColor: "#444",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  activeSportButton: {
    backgroundColor: "#00d09c",
  },
  sportText: {
    color: "#fff",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#00d09c",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CreateAnnouncement;
