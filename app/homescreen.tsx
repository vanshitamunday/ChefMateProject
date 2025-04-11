import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Alert } from "react-native";
import { useRouter } from "expo-router";
import supabase from "../lib/supabase";
import { HomeScreenProps } from "../interfaces/interfaces";
import Header from '../components/header';
import { SafeAreaView } from 'react-native';

const API_KEY = process.env.EXPO_PUBLIC_API_KEY!;
const API_HOST = process.env.EXPO_PUBLIC_API_HOST!;
const API_ID = process.env.EXPO_PUBLIC_API_ID!;

// Helper function to fetch recipes
const fetchRecipes = async (queryParams: string[]) => {
  const url = `${API_HOST}?type=public&beta=false&q=${encodeURIComponent(
    queryParams.join(" ")
  )}&app_id=${API_ID}&app_key=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Error fetching recipes");
  }

  const data = await response.json();
  return data.hits || [];
};

const HomeScreen: React.FC<HomeScreenProps> = ({ userName }) => {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(userName);
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [rainbowRecipes, setRainbowRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      fetchUserDetails();
    }

    // Simulate fetching random recipes on page load
    const randomQuery = ["chicken", "pasta", "soup", "tacos"];
    const rainbowQuery = ["vegan", "vegetarian", "gluten-free", "low-carb"];

    const fetchRandomRecipes = async () => {
      try {
        const randomResults = await fetchRecipes(randomQuery);
        const rainbowResults = await fetchRecipes(rainbowQuery);
        setRandomRecipes(randomResults.slice(0, 4)); // Show only the first 4 recipes for Trending
        setRainbowRecipes(rainbowResults.slice(0, 4)); // Show only the first 4 recipes for Eat the Rainbow
      } catch (error) {
        console.error("Error fetching recipes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomRecipes();
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

  const handleSearch = async () => {
    router.push("/findRecipe/typeSelection");
  };

  const renderRecipe = ({ item }: { item: any }) => (
    <View style={styles.recipeCard}>
      <Image source={{ uri: item.recipe.image }} style={styles.recipeImage} />
      <Text style={styles.recipeText}>{item.recipe.label}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      {/* Welcome Message */}
      <Text style={styles.title}>Welcome, {user || "Guest"}!</Text>

      {/* Trending Section */}
      <Text style={styles.sectionTitle}>Trending!!</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={randomRecipes}
          renderItem={renderRecipe}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}

      {/* Eat the Rainbow Section */}
      <Text style={[styles.sectionTitle, styles.spacingTop]}>Eat the Rainbow!!</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={rainbowRecipes}
          renderItem={renderRecipe}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
      
      {/* Let's Get Cooking Button */}
      <TouchableOpacity style={styles.getCookingButton} onPress={handleSearch}>
        <Text style={styles.getCookingText}>Let's Get Cooking!</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBE8D3",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3B3131",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 55,
  },
  getCookingButton: {
    backgroundColor: "#D94F30",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  getCookingText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3B3131",
    marginBottom: 10,
  },
  spacingTop: {
    marginTop: 10,
    marginBottom: 10,
  },
  recipeCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginRight: 16,
    padding: 10,
    width: 180,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  recipeImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
    borderRadius: 8,
  },
  recipeText: {
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3B3131",
    fontSize: 14,
  },
});

export default HomeScreen;