import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const MatchScreen = ({ route }) => {
  const navigation = useNavigation();
  const bookingInfo = route?.params?.bookingInfo;

  const [filterSport, setFilterSport] = useState("Football");
  const [bookedMatches, setBookedMatches] = useState([
    {
      id: 1,
      sport: "Football",
      fieldName: "สนามฟุตบอล A",
      date: "2025-04-25",
      currentPlayers: 5,
      maxPlayers: 10,
      description: "การแข่งขันฟุตบอลรายการเล็ก",
      location: { latitude: 13.7563, longitude: 100.5018 },
    },
    {
      id: 2,
      sport: "Basketball",
      fieldName: "สนามบาสเกตบอล B",
      date: "2025-04-26",
      currentPlayers: 3,
      maxPlayers: 5,
      description: "การฝึกซ้อมบาสเกตบอล",
      location: { latitude: 13.7603, longitude: 100.5158 },
    },
  ]);

  const filtered =
    filterSport === "All"
      ? bookedMatches
      : bookedMatches.filter((item) => item.sport === filterSport);

  const openGPS = (location) => {
    if (!location || !location.latitude || !location.longitude) {
      console.log("Invalid location data.");
      return;
    }

    const url = `https://maps.google.com/?q=${location.latitude},${location.longitude}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url).catch((err) =>
            console.error("An error occurred while opening URL:", err)
          );
        } else {
          console.log("Google Maps cannot be opened.");
        }
      })
      .catch((err) => console.error("An error occurred during Linking operation", err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.replace("Home")}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>My Booked Matches</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.profileButton}>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/147/147144.png" }}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.filterRow}>
        {["All", "Football", "Basketball", "Badminton"].map((sport) => (
          <TouchableOpacity
            key={sport}
            style={[styles.filterButton, filterSport === sport && styles.activeFilter]}
            onPress={() => setFilterSport(sport)}
          >
            <Text style={styles.filterText}>{sport}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {bookingInfo ? (
        <View style={styles.card}>
          <Text style={styles.cardText}>การจองของคุณ</Text>
          <Text style={styles.cardText}>สนาม: {bookingInfo.name}</Text>
          <Text style={styles.cardText}>วันที่: {bookingInfo.date}</Text>
          <Text style={styles.cardText}>เวลา: {bookingInfo.time}</Text>

          {bookingInfo.location && (
            <TouchableOpacity
              style={styles.mapButton}
              onPress={() => openGPS(bookingInfo.location)}
            >
              <Text style={styles.joinText}>Open in Maps</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.cardText}>ไม่มีข้อมูลการจอง</Text>
        </View>
      )}

      {filtered.length > 0 ? (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>กีฬา: {item.sport}</Text>
              <Text style={styles.cardText}>สนาม: {item.fieldName}</Text>
              <Text style={styles.cardText}>วันที่: {item.date}</Text>
              <Text style={styles.cardText}>
                จำนวน: {item.currentPlayers}/{item.maxPlayers}
              </Text>
              <Text style={styles.cardText}>รายละเอียด: {item.description}</Text>
              <TouchableOpacity
                style={styles.mapButton}
                onPress={() => openGPS(item.location)}
              >
                <Text style={styles.joinText}>Open in Maps</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.cardText}>ไม่มีการจองสำหรับกีฬา {filterSport}</Text>
      )}

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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "#2D365C",
    padding: 8,
    borderRadius: 8,
  },
  backText: {
    color: "#fff",
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  profileButton: {
    padding: 10,
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#fff",
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  activeFilter: {
    backgroundColor: "#ffffff15",
  },
  filterText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#2c2c3c",
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  cardText: {
    fontSize: 14,
    color: "#E0E0E0",
    marginBottom: 4,
  },
  mapButton: {
    marginTop: 10,
    backgroundColor: "#00d09c",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  joinText: {
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
  navText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MatchScreen;
