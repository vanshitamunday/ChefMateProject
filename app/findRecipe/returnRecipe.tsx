import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import RecipeList from "../../components/recipeList";
import { useLocalSearchParams } from "expo-router";
import { RecipeHit } from "../../interfaces/interfaces";
import useApiCall from "../../hooks/useApiCall";

export default function ReturnRecipe() {
  const { ingredients, triggerSearch: triggerSearchParam } = useLocalSearchParams();
  const [hasSearched, setHasSearched] = useState(false);
  const [recipes, setRecipes] = useState<RecipeHit[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleResetSearch = useCallback(() => {
    setHasSearched(false);
    setRecipes(null);
    setError(null);
  }, []);

  const triggerApiCall = useApiCall({
    triggerSearch: true,
    resetTrigger: handleResetSearch,
    setRecipes,
    setError,
  });

  useEffect(() => {
    if (triggerSearchParam === "true") {
      setHasSearched(true);
      const ingredientsArray = typeof ingredients === "string"
        ? ingredients.split(",")
        : Array.isArray(ingredients)
        ? ingredients
        : [];

      triggerApiCall(ingredientsArray);
    }
  }, [triggerSearchParam]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eat up!</Text>

      <View style={styles.mascotWrapper}>
        <Image
          source={require("../../assets/ChefMateLogo.jpg")}
          style={styles.mascotImage}
        />
      </View>

      <View style={styles.recipeSection}>
        <Text style={styles.sectionTitle}>Recipes</Text>

        {recipes && recipes.length > 0 && (
          <RecipeList recipes={recipes} />
        )}

        {error && (
          <Text style={styles.errorText}>⚠️ {error}</Text>
        )}

        {hasSearched && recipes?.length === 0 && !error && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Searching for delicious recipes...</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBE8D3",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3B3131",
    textAlign: "center",
    marginBottom: 16,
  },
  mascotWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  mascotImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
  },
  recipeSection: {
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 12,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3B3131",
    marginBottom: 16,
    marginLeft: 4,
  },
  errorText: {
    textAlign: "center",
    color: "red",
    fontSize: 16,
    marginTop: 20,
  },
  loadingContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#444",
  },
});
