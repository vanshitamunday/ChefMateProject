import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import RecipeList from "./recipeList";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY!;
const API_ID = process.env.EXPO_PUBLIC_API_ID!;
const API_HOST = process.env.EXPO_PUBLIC_API_HOST!;

// 🔧 Hardcoded for test from HomeScreen
export default function CallAPI() {
  const query = "lunch";

  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      console.log("Calling Edamam API with query:", query);
      searchRecipes();
    }
  }, []);

  const searchRecipes = async () => {
    setRecipes([]);
    setError("");
    setLoading(true);

    const url = `${API_HOST}/api/recipes/v2?type=public&q=${encodeURIComponent(
      query
    )}&app_id=${API_ID}&app_key=${API_KEY}`;

    console.log("API URL:", url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.hits && data.hits.length > 0) {
        const firstFiveHits = data.hits.slice(0, 5);
        setRecipes(firstFiveHits);
      } else {
        setError("No recipes found for this selection.");
      }
    } catch (err: any) {
      setError(`Error fetching recipes: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" style={{ marginTop: 16 }} />}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <RecipeList recipes={recipes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 20,
  },
  error: {
    color: "red",
    marginTop: 12,
    marginBottom: 12,
    fontWeight: "bold",
  },
});
