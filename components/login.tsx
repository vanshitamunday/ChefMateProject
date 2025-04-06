import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import supabase from '../lib/supabase';
import { router } from 'expo-router';

interface SignInProps {
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  onSignInSuccess: (name: string) => void;
}

export default function Sign_In({ setIsSignedIn, onSignInSuccess }: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    checkUserSession();
  }, []);

  const checkUserSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      router.push('/homescreen');
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Please enter both email and password');
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      Alert.alert('Login Failed', error.message);
      return;
    }

    if (data?.user?.id) {
      const { data: userData, error: userError } = await supabase
        .from("user_details")
        .select("*")
        .eq("uuid", data.user.id)
        .single();

      if (userError || !userData) {
        Alert.alert("Error", "Could not fetch user details.");
        return;
      }

      setIsSignedIn(true);
      onSignInSuccess(userData.first_name);

      router.push('/homescreen');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/ChefMateLogo.jpg')} style={styles.logo} resizeMode="contain" />

      <Text style={styles.title}>Welcome to ChefMate!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signUpButton} onPress={() => router.push('/signup')}>
        <Text style={styles.signUpText}>Create an Account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#FBE8D3',
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: '#f5f5f5',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#D94F30',
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 60,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    width: '100%',
    maxWidth: 350,
    height: 50, 
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#000',
    fontSize: 16,
    marginBottom: 16,
  },
  signInButton: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#5BA37F',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  signInText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signUpButton: {
    marginTop: 20,
    padding: 12,
  },
  signUpText: {
    color: '#555',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#FBE8D3',
  },  
});
