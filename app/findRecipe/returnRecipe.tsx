import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet} from "react-native";
import RecipeList from "../../components/recipeList";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { RecipeProps } from "../../interfaces/interfaces";
import useApiCall from "../../hooks/useApiCall";

export default function ReturnRecipe() {
  const {ingredientString, triggerSearch: triggerSearchParam } = useLocalSearchParams();
  const [hasSearched, setHasSearched] = useState(false);
  const [recipes, setRecipes] = useState<RecipeProps[] | null>(null);
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
    setError
  });

  useEffect(() => {
    if (triggerSearchParam === 'true'){
        setHasSearched(true);
        const ingredientsArray = Array.isArray(ingredientString) ? ingredientString : [ingredientString];
        triggerApiCall(ingredientsArray);
    }
  }, [triggerSearchParam])

  return (
    <View>
      {recipes && recipes.length > 0 && (
        <RecipeList recipes={recipes}/>
      )}
      
      {error && (
        <Text>Enter ingredients and search</Text>
      )}

      {hasSearched && recipes?.length === 0 && !error && (
        <Text>Loading recipes...</Text>
      )}
    </View>
  )
}

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
