import React, { useState } from 'react';
import { Text, View, Alert, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    if (!username || !password) {
      Alert.alert('Vui lòng điền đầy đủ thông tin');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        ho_ten: username,
        mat_khau: password,
      });
        localStorage.setItem('tendangnhap', response.data.user.ho_ten);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', response.data.user.vaitro);
    } catch (error) {
        setError(error.response?.data?.message || 'Đăng nhập thất bại');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

       <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

       <TouchableOpacity onPress={() => navigation.navigate('Quên mật khẩu')}>
        <Text style={styles.linkText}>Quên mật khẩu</Text>
      </TouchableOpacity>

       <TouchableOpacity onPress={() => navigation.navigate('Đăng ký')}>
        <Text style={styles.linkText}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
  };

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    loginText: {
        color: '#fff',
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
        width: '80%',
    },
    linkText: {
        color: '#007BFF',
        marginTop: 10,
        textDecorationLine: 'underline',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },

  });