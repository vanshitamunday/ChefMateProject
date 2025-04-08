import React, {useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput } from "react-native";
import { useRouter } from "expo-router";

export default function SearchRecipes() {
  const [ingredientString, setIngredientString] = useState("");
  const router = useRouter();

  const handleSearchPress = () => {
    if(ingredientString.trim()) {
      router.push({
        pathname: "/findRecipe/returnRecipe",
        params: {
          ingredientString: ingredientString,
          triggerSearch: "true",
        },
      });
    }else {
      Alert.alert("PLease enter ingredients.")
    }
  };

  return(
    <View>
      <Text>Enter INgredients:</Text>
      <TextInput
          placeholder="e.g., chicken"
          value={ingredientString}
          onChangeText={setIngredientString}
          />
          <TouchableOpacity onPress={handleSearchPress}>
            <Text>Search Recipes</Text>
          </TouchableOpacity>
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
