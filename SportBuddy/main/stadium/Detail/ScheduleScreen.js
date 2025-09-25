import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const ScheduleScreen = ({ route, navigation }) => {
  const { court } = route.params;

  const [selectedField] = useState("สนาม 1");
  const [selectedTime, setSelectedTime] = useState([]);
  const [selectedDate] = useState("2025-04-22");

  const bookedSlots = {
    "09:00-10:00": false,
    "10:00-11:00": false,
    "11:00-12:00": true,
    "12:00-13:00": false,
    "13:00-14:00": false,
    "14:00-15:00": false,
    "15:00-16:00": false,
    "16:00-17:00": false,
    "17:00-18:00": false,
    "18:00-19:00": false,
    "19:00-20:00": false,
    "20:00-21:00": false,
    "21:00-22:00": false,
    "22:00-23:00": false,
    "23:00-00:00": false,
  };

  const timeSlots = Object.keys(bookedSlots);

  const handleBooking = async () => {
    if (selectedTime.length === 0) return;

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("ต้องล็อกอินก่อน", "กรุณาเข้าสู่ระบบก่อนทำการจอง");
      return;
    }

    const bookingData = {
      namestadium: court.name || "สนามกีฬา",
      sport: court.sport || "Football",
      date: selectedDate,
      time: selectedTime.join(" - "),
      field: selectedField,
      userID: user.uid,
    };

    try {
      const db = getFirestore();
      await addDoc(collection(db, "bookings"), bookingData);
      Alert.alert("จองสำเร็จ", "ระบบได้บันทึกการจองแล้ว");
      navigation.navigate("MatchScreen", { bookingInfo: bookingData });
    } catch (error) {
      console.error("Firestore Error:", error);
      Alert.alert("เกิดข้อผิดพลาด", "ไม่สามารถบันทึกการจองได้");
    }
  };

  const toggleTimeSlot = (slot) => {
    if (bookedSlots[slot]) return;
    let newSelectedTime = [...selectedTime];
    const index = newSelectedTime.indexOf(slot);
    if (index === -1) {
      newSelectedTime.push(slot);
      if (newSelectedTime.length > 3) {
        newSelectedTime = newSelectedTime.slice(newSelectedTime.length - 3);
      }
    } else {
      newSelectedTime.splice(index, 1);
    }
    setSelectedTime(newSelectedTime);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>เลือกเวลาจอง</Text>
      <Text style={styles.subTitle}>วันที่: {selectedDate}</Text>

      <View style={styles.fieldSelector}>
        <TouchableOpacity style={[styles.fieldButton, styles.selectedFieldButton]}>
          <Text style={[styles.fieldButtonText, styles.selectedFieldButtonText]}>
            {selectedField}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={timeSlots}
        keyExtractor={(item) => item}
        numColumns={3}
        contentContainerStyle={styles.timeList}
        renderItem={({ item }) => {
          const isBooked = bookedSlots[item];
          const isSelected = selectedTime.includes(item);
          return (
            <TouchableOpacity
              style={[
                styles.timeSlot,
                isSelected && !isBooked && styles.selectedTimeSlot,
                isBooked && styles.bookedTimeSlot,
              ]}
              onPress={() => !isBooked && toggleTimeSlot(item)}
              disabled={isBooked}
            >
              <Text style={[styles.timeText, isBooked && styles.bookedTimeText]}>
                {item} {isBooked ? "(ถูกจองแล้ว)" : ""}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity
        style={[styles.confirmButton, selectedTime.length === 0 && { backgroundColor: "#555" }]}
        disabled={selectedTime.length === 0}
        onPress={handleBooking}
      >
        <Text style={styles.confirmText}>ยืนยันการจอง</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1c1c2e", padding: 16 },
  title: { color: "#fff", fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  subTitle: { color: "#bbb", marginBottom: 16 },
  fieldSelector: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  fieldButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#333",
    borderRadius: 8,
  },
  selectedFieldButton: {
    backgroundColor: "#00d09c",
  },
  fieldButtonText: {
    color: "#ccc",
    fontWeight: "bold",
  },
  selectedFieldButtonText: {
    color: "#fff",
  },
  timeList: {
    paddingBottom: 20,
  },
  timeSlot: {
    backgroundColor: "#444",
    padding: 16,
    margin: 8,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  selectedTimeSlot: {
    backgroundColor: "#00d09c",
  },
  bookedTimeSlot: {
    backgroundColor: "#333",
    opacity: 0.5,
  },
  timeText: {
    color: "#fff",
    fontSize: 14,
  },
  bookedTimeText: {
    color: "#aaa",
    fontStyle: "italic",
  },
  confirmButton: {
    backgroundColor: "#00d09c",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ScheduleScreen;
