import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import supabase from "../lib/supabase";
import CallAPI from "../components/apiCall";

interface HomeScreenProps {
  userName: string | null;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ userName }) => {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(userName);
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [ingredients] = useState("chicken");

  useEffect(() => {
    if (!user) {
      fetchUserDetails();
    }
  }, [user]);

  const fetchUserDetails = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.replace("/");
      return;
    }

    const { data, error } = await supabase
      .from("user_details")
      .select("first_name")
      .eq("uuid", session.user.id)
      .single();

    if (error || !data) {
      Alert.alert("Error", "Could not fetch user details.");
      setUser("Guest");
    } else {
      setUser(data.first_name);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Logout Failed", error.message);
      return;
    }
    router.replace("/");
  };

  const handleSearch = async () => {
    setTriggerSearch(true);
  };

  const resetTrigger = () => {
    setTriggerSearch(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user || "Guest"}!</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleSearch}>
        <Text style={styles.logoutText}>Search</Text>
      </TouchableOpacity>
      <CallAPI ingredientString={ingredients} triggerSearch={triggerSearch} resetTrigger={resetTrigger} />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBE8D3",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#D94F30",
    marginBottom: 40,
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#FF5252",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
