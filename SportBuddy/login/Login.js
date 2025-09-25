import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // เพิ่มการนำเข้า auth

const Login = ({ navigation }) => {
  const [email, setEmail] = useState(''); // เปลี่ยนจาก username เป็น email
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter your email and password!');
      return;
      
    }
    // เช็คถ้าค่าที่กรอกเป็น ID admi
    if (email === 'admin' && password === 'a123') {
      navigation.replace('Home'); // ถ้าเป็น admin ให้ไปที่หน้า Home ทันที
      return;
    }
    try {
      // ล็อกอินด้วย email และ password
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Home'); // เปลี่ยนไปหน้า Home หลังจาก login สำเร็จ
    } catch (error) {
      let errorMessage = error.message;
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No user found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      }
      Alert.alert('Login Failed', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
        <Text style={styles.link}>Don't have an account? Register</Text>
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
    backgroundColor: '#00aaff',
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
    color: '#00aaff',
    marginTop: 15,
    fontSize: 14,
  },
});

export default Login;
