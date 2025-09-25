import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // นำเข้า Firestore
import { auth } from '../firebaseConfig'; // เพิ่มการนำเข้า auth

const Signin = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // สถานะการโหลด

  const handleRegister = async () => {
    if (username === '' || phone === '' || email === '' || password === '') {
      Alert.alert('Error', 'Please fill in all fields!');
      return;
    }

    setIsLoading(true); // เริ่มสถานะการโหลด

    try {
      // ✅ สร้างบัญชีผู้ใช้
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // ✅ เก็บข้อมูลเพิ่มใน Firestore (ใช้ UID เป็น ID)
      const db = getFirestore();
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        username,
        phone,
        email,
      });

      Alert.alert('Success', 'You are now registered!');
      navigation.navigate('Login');
    } catch (error) {
      console.log('Registration error:', error.code, error.message); // 💡 เพิ่ม debug log
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'This email is already registered!');
      } else {
        Alert.alert('Registration Error', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Phone"
        style={styles.input}
        placeholderTextColor="#aaa"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={handleRegister} style={styles.button} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#1c1c2b',
    padding: 20,
    marginTop: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    padding: 12,
    marginVertical: 10,
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#007AFF',
    marginTop: 15,
    fontSize: 14,
  },
});

export default Signin;
