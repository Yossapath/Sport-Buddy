import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const ProfileScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* ปุ่มย้อนกลับ */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.replace("Home")}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
      </TouchableOpacity>


      {/* ส่วนโปรไฟล์ */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: "https://via.placeholder.com/80" }} style={styles.profileImage} />
        <Text style={styles.profileName}>Mr. YOSSAPATH</Text>
        <Text style={styles.profileAge}>อายุ: -</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editText}>✏️ แก้ไขข้อมูลส่วนตัว</Text>
        </TouchableOpacity>
      </View>

      {/* ส่วนข้อมูล */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>เพื่อนที่กำลังติดตาม</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>ผู้ติดตาม</Text>
          <Text style={styles.infoNumber}>0</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>กำลังติดตาม</Text>
          <Text style={styles.infoNumber}>0</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ภาพรวม</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>จำนวนที่เล่น</Text>
          <Text style={styles.infoNumber}>0</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>อัตราการยกเลิก</Text>
          <Text style={styles.infoNumber}>0.00%</Text>
        </View>
      </View>

      {/* ตั้งค่า */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>การตั้งค่า</Text>
        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingText}>🌐 ภาษา</Text>
          <Text style={styles.settingValue}>ไทย</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingRow}>
          <Text style={styles.settingText}>ℹ️ ข้อตกลงและเงื่อนไข</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121222",
  },
  backButton: {
    padding: 15,
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  backText: {
    fontSize: 24,
    color: "#fff",
  },
  profileHeader: {
    alignItems: "center",
    marginTop: 80,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ccc",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#fff",
  },
  profileAge: {
    fontSize: 14,
    color: "#ccc",
  },
  editButton: {
    marginTop: 5,
    padding: 5,
  },
  editText: {
    color: "#FFA500",
    fontSize: 14,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#2e2e3e",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#ccc",
  },
  infoNumber: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  settingText: {
    fontSize: 14,
    color: "#ccc",
  },
  settingValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default ProfileScreen;
