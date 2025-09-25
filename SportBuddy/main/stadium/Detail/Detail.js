import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig"; // ✅ ใช้ db จากไฟล์ config

const Detail = ({ route, navigation }) => {
  const { court } = route.params;

  if (!court) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>ไม่พบข้อมูลสนาม</Text>
      </View>
    );
  }

  const handleBooking = async () => {
    if (!court.id) {
      Alert.alert("Error", "ไม่พบรหัสสนาม (court.id)");
      return;
    }

    const bookingInfo = {
      courtName: court.name,
      date: court.date || "17/03/68",
      time: court.time || "18.00-19.00",
      userName: "User", // เปลี่ยนเป็นข้อมูลจริงภายหลัง
      userEmail: "user@example.com", // เปลี่ยนเป็นข้อมูลจริงภายหลัง
    };

    try {
      const db = getFirestore();
      await addDoc(
        collection(db, "stadium", court.id, "bookings"),
        bookingInfo
      );
      Alert.alert("Success", "การจองเสร็จสมบูรณ์!");
      navigation.navigate("MatchScreen", { court, bookingInfo });
    } catch (error) {
      Alert.alert("Booking Error", "เกิดข้อผิดพลาด: " + error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Image source={{ uri: court.image }} style={styles.image} />

      <View style={styles.titleContainer}>
        <Image source={{ uri: court.image }} style={styles.fieldIcon} />
        <Text style={styles.title}>{court.name}</Text>
        <View style={styles.rating}>
          <Ionicons name="star" size={18} color="#f1c40f" />
          <Text style={styles.ratingText}>{court.rating}</Text>
        </View>
      </View>

      <Text style={styles.subText}>{court.location || "N/A"}</Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>เงื่อนไขการจอง</Text>
        <Text style={styles.cardDesc}>
          {court.bookingConditions ||
            `เปิดบริการ 09:00-24:00น. ราคา 220฿/hr\n- สมาชิกธรรมดา 140฿/hr / นักศึกษา 160฿/hr ใช้เวลาไม่เกิน 17:00น. เท่านั้น\n- สนามขอไม่คืนเงินลูกค้าทุกกรณีที่ลูกค้าไม่สามารถเข้าใช้งานตามวันและเวลาที่จอง`}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subLabel}>สิ่งอำนวยความสะดวก</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.facilitiesList}>
          {/* Example facilities */}
          {["แอร์", "ไฟฟ้าส่องสว่าง", "น้ำดื่ม", "Wi-Fi",].map((facility, index) => (
            <View key={index} style={styles.facilityItem}>
              <Text style={styles.facilityText}>{facility}</Text>
              <Text style={styles.checkIcon}>✔</Text> {/* Check icon */}
            </View>
          ))}
        </ScrollView>

        {/* Price Section - Centered */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{court.price || "220฿/hr"}</Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => navigation.navigate("Schedule", { court })}
          >
            <Text style={styles.bookButtonText}>จองเลย</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1c2e",
  },
  errorText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  fieldIcon: {
    width: 30,
    height: 30,
    borderRadius: 6,
    marginRight: 8,
  },
  container: {
    flex: 1,
    backgroundColor: "#1c1c2e",
    paddingHorizontal: 16,
  },
  backButton: {
    marginTop: 40,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 16,
  },
  subText: {
    color: "#bbb",
    fontSize: 14,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#2c2c3c",
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
  },
  cardText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardDesc: {
    color: "#ccc",
    fontSize: 14,
    lineHeight: 20,
  },
  subLabel: {
    color: "#aaa",
    fontSize: 14,
    marginVertical: 5,
  },
  facilitiesList: {
    marginVertical: 10,
  },
  facilityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 8,
  },
  facilityText: {
    color: "#fff",
    fontSize: 14,
    marginRight: 5,
  },
  checkIcon: {
    color: "#00d09c",
    fontSize: 16,
  },
  priceContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  price: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bookButton: {
    flex: 1,
    backgroundColor: "#00d09c",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 8,
  },
  bookButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  subLabel: {
    color: "#fff", // Updated to white for consistency with the card text
    fontSize: 18,   // Set to 18 to match the "เงื่อนไขการจอง" title size
    fontWeight: "bold", // Bold font to match the "เงื่อนไขการจอง" title
    marginVertical: 5,
  },
});

export default Detail;
