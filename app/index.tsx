import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Sign_In from "../components/login";
import Welcome from "./homescreen";
import supabase from "../lib/supabase";
import { SafeAreaView } from 'react-native';

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    checkUserSession(); 
  }, []);

  const checkUserSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
      setIsSignedIn(true);
      
      const { data, error } = await supabase
        .from("user_details")
        .select("first_name")
        .eq("uuid", session.user.id)
        .single();

      if (!error && data) {
        setUserName(data.first_name);
      } else {
        setUserName("Guest");
      }
    }
  };

  const handleSignIn = (name: string) => {
    setUserName(name);
    setIsSignedIn(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isSignedIn ? (
        <Welcome userName={userName} />
      ) : (
        <Sign_In setIsSignedIn={setIsSignedIn} onSignInSuccess={handleSignIn} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
