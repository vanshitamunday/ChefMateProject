import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { router } from "expo-router";
import supabase from "../lib/supabase";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert("Missing Fields", "Please fill in all fields.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        Alert.alert("Signup Failed", error.message);
        return;
      }

      if (data?.user?.id) {
        const userId = data.user.id;

        const { error: insertError } = await supabase
          .from("user_details")
          .insert([
            {
              uuid: userId,
              first_name: firstName,
              last_name: lastName,
              email,
            },
          ]);

        if (insertError) {
          Alert.alert("Database Error", insertError.message);
          return;
        }
      }

      Alert.alert("Success!", "Account created successfully. You can now log in.");
      router.push("/");
    } catch (err) {
      Alert.alert("Error", "An unexpected error occurred.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your ChefMate Account</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
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

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.textButton} onPress={() => router.push("/")}>
        <Text style={styles.textLink}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBE8D3",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#D94F30",
    marginBottom: 25,
  },
  input: {
    width: "100%",
    maxWidth: 350,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  button: {
    width: "100%",
    maxWidth: 350,
    height: 50,
    backgroundColor: "#5BA37F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  textButton: {
    marginTop: 20,
  },
  textLink: {
    fontSize: 15,
    color: "#555",
    textDecorationLine: "underline",
  },
});