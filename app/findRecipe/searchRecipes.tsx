import React, {useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput } from "react-native";
import { useRouter } from "expo-router";

export default function SearchRecipes() {
  const [ingredientString, setIngredientString] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("")
  const router = useRouter();

  const handleSearchPress = () => {
    if(ingredientString) {
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
  
  const ingredientStringAdd = () => {
    if(inputValue) {
      setIngredientString([...ingredientString, inputValue]);
      setInputValue("");
    }
  }

  return(
    <View>
      <Text>Enter Ingredients:</Text>
      <TextInput
          placeholder="e.g., chicken"
          value={inputValue}
          onChangeText={setInputValue}
          />
          <TouchableOpacity onPress={ingredientStringAdd}>
            <Text>Add Ingredient</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSearchPress}>
            <Text>Search Recipes</Text>
          </TouchableOpacity>
          <Text>Current Ingredients: {ingredientString.join(", ")}</Text>
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
