import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput } from "react-native";
import CallAPI from "../../components/apiCall";
import RecipeList from "../../components/recipeList";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";



export default function ReturnRecipe() {
  const {ingredientString, triggerSearch: triggerSearchParam } = useLocalSearchParams();
  const [hasSearched, setHasSearched] = useState(false);
  const [recipes, setRecipes] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (triggerSearchParam === 'true'){
        setHasSearched(true);
    }
  }, [triggerSearchParam])

  const handleResetSearch = useCallback(() => {
    setHasSearched(false);
    setRecipes(null);
    setError(null);
  }, []);  

  return (
    <View>
      {hasSearched && ingredientString && (
        <CallAPI
          ingredientString={ingredientString as string}
          triggerSearch={true}
          resetTrigger={handleResetSearch}
          setRecipes={setRecipes}
          setError={setError}
        />        
      )}

      {recipes && recipes.length > 0 && (
        <RecipeList recipes={recipes}/>
      )}
      
      {error && (
        <Text>Enter ingredients and search</Text>
      )}

      {hasSearched && !recipes && !error && (
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
