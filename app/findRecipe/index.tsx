import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput } from "react-native";
import CallAPI from "../../components/apiCall";
import RecipeList from "../../components/recipeList";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";



export default function ReturnRecipe() {
  const {ingredientString, triggerSearch, resetTrigger } = useLocalSearchParams();

  const recipes = CallAPI({
    ingredientString: ingredientString as string,
    triggerSearch: triggerSearch === "true",
    resetTrigger: () => {},
  });

  if (recipes && recipes.length > 0) {
    return (
      <View>
        <RecipeList recipes={recipes} />
      </View>
    )
  } else if (recipes === null) {
    return (
      <View> 
        <Text>Loading Error...</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text>No recipes to display</Text>
      </View>
    )
  }
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
