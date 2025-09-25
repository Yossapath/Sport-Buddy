import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";

// ข้อมูลสนาม
const courts = [
  {
    id: "1",
    name: "โรงยิม สนามบาส (KU)",
    image: "https://cs.human.ku.ac.th/images/facility/a_sport/07.jpg",
    rating: "4.7",
    location: "Bangkok",
    openHours: "08:00 - 22:00",
    facilities: "Parking, Locker, Shower",
    mapUrl: "https://maps.app.goo.gl/L1GuLsDBanznj2d27",
  },
  {
    id: "2",
    name: "สนามบาสเกตบอลลือชาคลับ",
    image: "https://www.tananon.com/images/ready-template/crop-1531290004604.jpg",
    rating: "4.5",
    location: "Chiang Mai",
    openHours: "09:00 - 21:00",
    facilities: "Parking, Drinks",
    mapUrl: "https://maps.app.goo.gl/AmCve98Gt7xBaFVB8",
  },
  {
    id: "3",
    name: "สนามบาสเกตบอล STADIUM29",
    image: "https://www.wazzadu.com/thumbs/article/resize/760/article_69fc4ec0-fa0a-11e8-b365-3b3b6a9dce2f.jpg",
    rating: "4.8",
    location: "Phuket",
    openHours: "07:00 - 23:00",
    facilities: "Locker, Shower, Shop",
    mapUrl: "https://maps.app.goo.gl/dPeenAzRtepsmZin8",
  },
  {
    id: "4",
    name: "FBA Stadium",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXUJvFjZ3THiwXdItNval6WCvsbKYOGDKlyw&s",
    rating: "4.9",
    location: "Khon Kaen",
    openHours: "10:00 - 20:00",
    facilities: "Shower, Drinks",
    mapUrl: "https://maps.app.goo.gl/HYrjYxfVsnVMQ8nk7",
  },
  
];


const SBasketball = () => {
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
    const cancelButtonIndex = 0;  // ตัวเลือก Cancel

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

  // ฟังก์ชันเปิด Google Maps
  const openMap = (url) => {
    Linking.openURL(url).catch((err) => console.error("ไม่สามารถเปิดลิงก์ได้", err));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={20} color="#fff" />
      </TouchableOpacity>

      <View style={styles.sportTabs}>
        <Text style={styles.tabTextActive}>Basketball</Text>
      </View>

      {/* ปุ่มเดียวสำหรับเปิดตัวเลือกฟิลเตอร์ */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={showFilterOptions}
      >
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

              {/* ปุ่มดูแผนที่ */}
              <TouchableOpacity
                style={styles.mapButton}
                onPress={() => openMap(court.mapUrl)}
              >
                <Text style={styles.mapButtonText}>ดู GPS</Text>
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
  mapButton: {
    marginTop: 10,
    backgroundColor: "#00d09c",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  mapButtonText: {
    color: "#fff",
    fontSize: 16,
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

export default SBasketball;
