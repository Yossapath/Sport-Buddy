import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const MatchScreen = () => {
  const navigation = useNavigation();

  const [filterSport, setFilterSport] = useState("Football");
  const [bookedMatches, setBookedMatches] = useState([
    {
      id: "football01",
      sport: "Football",
      fieldName: "Status Academy",
      maxPlayers: 11,
      currentPlayers: 9,
      description: "11 VS 11",
      date: "2025-04-22 15:00",
    },
    {
      id: "basketball01",
      sport: "Basketball",
      fieldName: "Central Court",
      maxPlayers: 6,
      currentPlayers: 4,
      description: "5 VS 5 เต็มไวมาก",
      date: "2025-04-23 18:00",
    },
  ]);

  const filtered = filterSport === "All"
    ? bookedMatches
    : bookedMatches.filter(item => item.sport === filterSport);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.replace("Home")}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>My Booked Matches</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.profileButton}
        >
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/147/147144.png" }}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Filter ปุ่มเลือกกีฬา */}
      <View style={styles.filterRow}>
        {["All", "Football", "Basketball", "Volleyball"].map((sport) => (
          <TouchableOpacity
            key={sport}
            style={[styles.filterButton, filterSport === sport && styles.activeFilter]}
            onPress={() => setFilterSport(sport)}
          >
            <Text style={styles.filterText}>{sport}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const full = item.currentPlayers >= item.maxPlayers;

          return (
            <View style={styles.card}>
              <Text style={styles.cardText}>กีฬา: {item.sport}</Text>
              <Text style={styles.cardText}>สนาม: {item.fieldName}</Text>
              <Text style={styles.cardText}>วันที่: {item.date}</Text>
              <Text style={styles.cardText}>
                จำนวน: {item.currentPlayers}/{item.maxPlayers}
              </Text>
              <Text style={styles.cardText}>รายละเอียด: {item.description}</Text>

              <View style={styles.buttonRow}>
                {!full && (
                  <TouchableOpacity
                    style={[styles.joinButton, { backgroundColor: "#007bff" }]}
                    onPress={() => navigation.navigate("BookingDetails", { match: item })}
                  >
                    <Text style={styles.joinText}>View Details</Text>
                  </TouchableOpacity>
                )}

                {full && <Text style={styles.fullText}>เต็มแล้ว</Text>}
              </View>
            </View>
          );
        }}
      />

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
  container: { flex: 1, backgroundColor: "#121222" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "#1e1e2e",
  },
  backButton: {
    backgroundColor: "#354F7C",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  backText: { color: "#fff", fontWeight: "bold" },
  title: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFA500",
    justifyContent: "center",
    alignItems: "center",
  },
  profileIcon: { width: 30, height: 30 },

  filterRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#444",
    borderRadius: 20,
  },
  activeFilter: {
    backgroundColor: "#28a745",
  },
  filterText: {
    color: "#fff",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#FF6F61",
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  cardText: { color: "#fff", marginBottom: 5 },
  joinButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  joinText: { color: "#fff", textAlign: "center" },
  fullText: { color: "#fff", fontWeight: "bold", marginTop: 10 },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#1e1e2e",
  },
  navItem: { padding: 10 },
  navText: { color: "#ccc", fontSize: 16 },
  active: { color: "#fff", fontWeight: "bold" },navbar: {
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

export default MatchScreen;
