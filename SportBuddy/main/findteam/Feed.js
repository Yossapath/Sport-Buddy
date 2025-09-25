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
  import Ionicons from "react-native-vector-icons/Ionicons";

  const FeedScreen = () => {
    const navigation = useNavigation();
    const [filterSport, setFilterSport] = useState("All");
    const [joinedRooms, setJoinedRooms] = useState([]);

    const allAnnouncements = [
      {
        id: "football01",
        sport: "Football",
        fieldName: "Status Academy",
        maxPlayers: 11,
        currentPlayers: 9,
        description: "ไหม 11 VS 11",
      },
      {
        id: "football02",
        sport: "Football",
        fieldName: "Status Academy",
        maxPlayers: 6,
        currentPlayers: 3,
        description: "ไหม 6 VS 6",
      },
      {
        id: "basketball01",
        sport: "Basketball",
        fieldName: "Central Court",
        maxPlayers: 6,
        currentPlayers: 4,
        description: "5 VS 5 เต็มไวมาก",
      },
      {
        id: "Badminton01",
        sport: "Badminton",
        fieldName: "Court A",
        maxPlayers: 6,
        currentPlayers: 2,
        description: "ชวนเพื่อนมาตีลูกยาง",
      },
    ];

    const [announcements, setAnnouncements] = useState(allAnnouncements);

    const filtered =
      filterSport === "All"
        ? announcements
        : announcements.filter((item) => item.sport === filterSport);

    const handleJoin = (id) => {
      if (joinedRooms.length > 0) {
        Alert.alert("คุณได้เข้าร่วมทีมไปแล้ว", "กรุณายกเลิกทีมเดิมก่อนเข้าร่วมทีมใหม่");
        return;
      }

      setAnnouncements((prev) =>
        prev.map((item) =>
          item.id === id && item.currentPlayers < item.maxPlayers
            ? { ...item, currentPlayers: item.currentPlayers + 1 }
            : item
        )
      );

      setJoinedRooms([id]);
    };

    const handleCancel = (id) => {
      setAnnouncements((prev) =>
        prev.map((item) =>
          item.id === id && item.currentPlayers > 0
            ? { ...item, currentPlayers: item.currentPlayers - 1 }
            : item
        )
      );
      setJoinedRooms([]);
    };

    const handleNavigateCreate = () => {
      navigation.navigate("CreateAnnouncement", {
        updateAnnouncements: (newAnn) => {
          setAnnouncements((prev) => [...prev, newAnn]);
          setFilterSport("All");
        },
      });
    };

    return (
      <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.replace("Home")}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
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

        <TouchableOpacity style={styles.createButton} onPress={handleNavigateCreate}>
          <Text style={styles.createButtonText}>สร้างประกาศ</Text>
        </TouchableOpacity>

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const joined = joinedRooms.includes(item.id);
            const full = item.currentPlayers >= item.maxPlayers;

            return (
              <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate("AnnouncementDetail", { announcement: item })}
              >
                <Text style={styles.cardText}>กีฬา: {item.sport}</Text>
                <Text style={styles.cardText}>สนาม: {item.fieldName}</Text>
                <Text style={styles.cardText}>
                  จำนวน: {item.currentPlayers}/{item.maxPlayers}
                </Text>
                <Text style={styles.cardText}>รายละเอียด: {item.description}</Text>

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={[styles.joinButton, { backgroundColor: "#00d09c" }]}
                    onPress={() => navigation.navigate("ChatRoom", { roomId: item.id })}
                  >
                    <Text style={styles.joinText}>ChatRoom</Text>
                  </TouchableOpacity>

                  {!joined && !full && joinedRooms.length === 0 && (
                    <TouchableOpacity
                      style={[styles.joinButton, { backgroundColor: "#007bff" }]}
                      onPress={() => handleJoin(item.id)}
                    >
                      <Text style={styles.joinText}>Join Team</Text>
                    </TouchableOpacity>
                  )}

                  {!joined && !full && joinedRooms.length > 0 && (
                    <TouchableOpacity
                      style={[styles.joinButton, { backgroundColor: "#6c757d" }]}
                      onPress={() =>
                        Alert.alert(
                          "คุณได้เข้าร่วมทีมไปแล้ว",
                          "กรุณายกเลิกทีมเดิมก่อนเข้าร่วมทีมใหม่"
                        )
                      }
                    >
                      <Text style={styles.joinText}>Join Team</Text>
                    </TouchableOpacity>
                  )}

                  {joined && (
                    <TouchableOpacity
                      style={[styles.joinButton, { backgroundColor: "#dc3545" }]}
                      onPress={() => handleCancel(item.id)}
                    >
                      <Text style={styles.joinText}>Cancel Join</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {full && !joined && <Text style={styles.fullText}>เต็มแล้ว</Text>}
              </TouchableOpacity>
            );
          }}
        />

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
    createButton: {
      backgroundColor: "#2c2c3c",
      paddingVertical: 10,
      borderRadius: 20,
      marginBottom: 16,
      alignItems: "center",
    },
    createButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
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
    buttonRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginTop: 10,
    },
    joinButton: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 20,
      marginVertical: 4,
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 1,
      marginHorizontal: 4,
    },
    joinText: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "600",
    },
    fullText: {
      color: "#e74c3c",
      fontSize: 14,
      fontWeight: "bold",
      marginTop: 10,
      textAlign: "center",
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

  export default FeedScreen;