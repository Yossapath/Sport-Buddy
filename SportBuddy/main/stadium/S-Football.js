import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking, // เพิ่มการใช้งาน Linking
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";

// ข้อมูลสนาม
const courts = [
  {
    id: "1",
    name: "Ratchyorin Football club",
    image: "https://cms.dmpcdn.com/sportarticle/2016/11/29/70ad8333-147b-46cb-92cc-f1fd4820d194.jpg",
    rating: "4.7",
    location: "Bangkok",
    openHours: "08:00 - 22:00",
    facilities: "Parking, Locker, Shower",
    mapUrl: "https://maps.app.goo.gl/5o6SPCyjbUgkxP8g6",  // ลิงก์ Google Maps สำหรับตำแหน่งสนาม
  },
  {
    id: "2",
    name: "Bangkok Arena",
    image: "https://kshero.com/wp-content/uploads/2020/10/f1.jpg",
    rating: "4.5",
    location: "Chiang Mai",
    openHours: "09:00 - 21:00",
    facilities: "Parking, Drinks",
    mapUrl: "https://maps.app.goo.gl/siTNmpYJF9TZf4eSA",  // ลิงก์ Google Maps สำหรับตำแหน่งสนาม
  },
  {
    id: "3",
    name: "The Campus",
    image: "https://image.soidb.com/bangkok/zm/061109215_01.jpg",
    rating: "4.8",
    location: "Phuket",
    openHours: "07:00 - 23:00",
    facilities: "Locker, Shower, Shop",
    mapUrl: "https://maps.app.goo.gl/MF8Xrqh2atDqQDh57",  // ลิงก์ Google Maps สำหรับตำแหน่งสนาม
  },
  {
    id: "4",
    name: "Football SCB",
    image: "https://s3gw.inet.co.th:8082/smegp-image-1/prod/V1/250820213412221.jpg",
    rating: "4.9",
    location: "Khon Kaen",
    openHours: "10:00 - 20:00",
    facilities: "Shower, Drinks",
    mapUrl: "https://maps.app.goo.gl/Aeb9YUrptjQzYVTZ9",  // ลิงก์ Google Maps สำหรับตำแหน่งสนาม
  },
];

const SFootball = () => {
  const navigation = useNavigation();
  const [filter, setFilter] = useState("ใกล้ฉัน");

  // ใช้ hook useActionSheet
  const { showActionSheetWithOptions } = useActionSheet();

  // ฟังก์ชันเปิดตัวเลือกฟิลเตอร์
  const showFilterOptions = () => {
    const options = [
      "Cancel",
      "ใกล้ฉัน",
      "ถูกที่สุด",
      "แพงที่สุด",
      "รีวิวดีที่สุด",
    ];
    const cancelButtonIndex = 0; // ตัวเลือก Cancel

    // เรียกใช้ showActionSheetWithOptions
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          setFilter("ใกล้ฉัน");
        } else if (buttonIndex === 2) {
          setFilter("ถูกที่สุด");
        } else if (buttonIndex === 3) {
          setFilter("แพงที่สุด");
        } else if (buttonIndex === 4) {
          setFilter("รีวิวดีที่สุด");
        }
      }
    );
  };

  // ฟังก์ชั่นสำหรับการเรียงข้อมูล
  const sortCourts = (courts, filter) => {
    if (filter === "ใกล้ฉัน") {
      return courts.sort((a, b) => (a.location === "Bangkok" ? -1 : 1)); // กรองสนามใกล้ฉัน
    }
    if (filter === "ถูกที่สุด") {
      return courts.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating)); // เรียงจากถูกที่สุด
    }
    if (filter === "แพงที่สุด") {
      return courts.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)); // เรียงจากแพงที่สุด
    }
    if (filter === "รีวิวดีที่สุด") {
      return courts.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)); // เรียงจากรีวิวดีที่สุด
    }
    return courts;
  };

  const sortedCourts = sortCourts(courts, filter);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={20} color="#fff" />
      </TouchableOpacity>
      <View style={styles.sportTabs}>
        <Text style={styles.tabTextActive}>Football</Text>
      </View>

      {/* ปุ่มเดียวสำหรับเปิดตัวเลือกฟิลเตอร์ */}
      <TouchableOpacity style={styles.filterButton} onPress={showFilterOptions}>
        <Text style={styles.filterText}>เลือกฟิลเตอร์: {filter}</Text>
      </TouchableOpacity>

      {/* แสดงผลตามฟิลเตอร์ที่เลือก */}
      <ScrollView style={styles.scrollArea}>
        {sortedCourts.map((court) => (
          <TouchableOpacity
            key={court.id}
            style={styles.listItem}
            onPress={() => navigation.navigate("Detail", { court })}
          >
            <Image source={{ uri: court.image }} style={styles.listImage} />
            <View style={styles.listContent}>
              <Text style={styles.listTitle}>{court.name}</Text>
              <View style={styles.rating}>
                <FontAwesome name="star" size={16} color="#f1c40f" />
                <Text style={styles.ratingText}>{court.rating}</Text>
              </View>
              {/* ปุ่ม "ดู GPS" */}
              <TouchableOpacity
                style={styles.gpsButton}
                onPress={() => Linking.openURL(court.mapUrl)}  // เปิด Google Maps เมื่อกดปุ่ม
              >
                <Text style={styles.gpsButtonText}>ดู GPS</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      
                 {/* Bottom Navigation */}
                 <View style={styles.navbar}>
                   <TouchableOpacity onPress={() => navigation.replace("Home")}>
                     <Text style={styles.navText}>Home</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={() => navigation.replace("Feed")}>
                     <Text style={styles.navText}>Feed</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={() => navigation.replace("MatchScreen")}>
                     <Text style={styles.navText}>Match</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={() => navigation.replace("Profile")}>
                     <Text style={styles.navText}>Profile</Text>
                   </TouchableOpacity>
                 </View>
               </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c2e",
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 16,
    zIndex: 10,
    padding: 5,
    backgroundColor: "#333",
    borderRadius: 20,
  },
  sportTabs: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  tabTextActive: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  filterButton: {
    backgroundColor: "#2c2c3c",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 20,
  },
  filterText: {
    color: "#fff",
    fontSize: 16,
  },
  scrollArea: {
    flex: 1,
    marginBottom: 70,
  },
  listItem: {
    flexDirection: "row",
    backgroundColor: "#2c2c3c",
    borderRadius: 14,
    marginBottom: 16,
    overflow: "hidden",
    paddingVertical: 12,
    elevation: 2,
  },
  listImage: {
    width: 130,
    height: 130,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
  listContent: {
    flex: 1,
    padding: 14,
    justifyContent: "center",
  },
  listTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    color: "#f1c40f",
    marginLeft: 6,
    fontSize: 16,
    fontWeight: "600",
  },
  gpsButton: {
    marginTop: 10,
    backgroundColor: "#00d09c",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  gpsButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1e1e2e",
    paddingVertical: 15,
    position: "absolute",
    bottom: 0,
    width: "110%",
  },
  navText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
});
export default SFootball;
