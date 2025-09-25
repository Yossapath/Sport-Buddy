import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

const sportsData = [
  {
    id: "football",
    icon: "⚽",
    name: "Football",
    stadiumScreen: "StadiumFootball",
    findTeamScreen: "FindFootball",
  },
  {
    id: "basketball",
    icon: "🏀",
    name: "Basketball",
    stadiumScreen: "StadiumBasketball",
    findTeamScreen: "FindBasketball",
  },
  {
    id: "Badminton",
    icon: "🏸",
    name: "Badminton",
    stadiumScreen: "StadiumBadminton",
    findTeamScreen: "FindBadminton",
  },
];

const Home = ({ navigation }) => {
  const [selectedSport, setSelectedSport] = useState(null);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Welcome to Sport Buddy</Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.profileText}>Y</Text>
        </TouchableOpacity>
      </View>

      {/* ปุ่ม "ค้นหาสนาม" และ "โปรโมชั่น" */}
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {
            if (selectedSport) {
              navigation.navigate(selectedSport.stadiumScreen, {
                sport: selectedSport.id,
              });
            } else {
              alert("กรุณาเลือกกีฬาก่อน!");
            }
          }}
        >
          <Image
            source={{ uri: "https://your-image-url.com/book-now.png" }}
            style={styles.menuIcon}
          />
          <View style={styles.menuTextWithIcon}>
            <Text style={styles.menuText}>ค้นหาสนาม</Text>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/622/622669.png" }}
              style={styles.searchIcon}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => {
            if (selectedSport) {
              navigation.navigate(selectedSport.findTeamScreen, {
                sport: selectedSport.id,
              });
            } else {
              alert("กรุณาเลือกกีฬาก่อน!");
            }
          }}
        >
          <Image
            source={{ uri: "https://your-image-url.com/promotion.png" }}
            style={styles.menuIcon}
          />
          <Text style={styles.menuText}>โปรโมชั่น</Text>
        </TouchableOpacity>
      </View>

      {/* เลือกกีฬา */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>เลือกประเภทของกีฬา</Text>
        {sportsData.map((sport) => (
          <TouchableOpacity
            key={sport.id}
            style={[
              styles.sportButton,
              selectedSport?.id === sport.id && styles.selectedSportButton,
            ]}
            onPress={() => setSelectedSport(sport)}
          >
            <View style={styles.sportContainer}>
              <Text style={styles.sportIcon}>{sport.icon}</Text>
              <Text style={styles.sportText}>{sport.name}</Text>
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
  container: { flex: 1, backgroundColor: "#1c1c2e" },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 15,
  },
  headerText: { color: "#ffffff", fontSize: 22, fontWeight: "bold" },
  profileButton: {
    width: 35,
    height: 35,
    borderRadius: 17,
    backgroundColor: "#1e1e2e",
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: { color: "#ffffff", fontWeight: "bold", fontSize: 16 },

  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 15,
  },
  menuButton: {
    backgroundColor: "#2c2c3c",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  menuIcon: { width: 50, height: 50, resizeMode: "contain" },
  menuText: { fontSize: 14, fontWeight: "bold", color: "#ffffff" },
  menuTextWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginLeft: 6,
    tintColor: "#ffffff",
  },

  scrollContainer: { alignItems: "center", padding: 15, paddingBottom: 80 },
  header: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  sportButton: {
    width: "100%",
    backgroundColor: "#2c2c3c",
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  selectedSportButton: { backgroundColor: "#ff7f00" },
  sportContainer: { flexDirection: "column", alignItems: "center" },
  sportIcon: { fontSize: 32, marginBottom: 5, color: "#ffffff" },
  sportText: { fontSize: 20, fontWeight: "bold", color: "#ffffff" },

  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1e1e2e",
    paddingVertical: 15,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
});

export default Home;
