import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  FlatList,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function SearchRecipes() {
  const [ingredientString, setIngredientString] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();
  const { mealType, allergies } = useLocalSearchParams();

  const handleSearchPress = () => {
    if (ingredientString.length > 0) {
      router.push({
        pathname: "/findRecipe/vegetables",
        params: {
          mealType,
          allergies,
          ingredientString: ingredientString.join(","),
        },
      });
    } else {
      Alert.alert("Please enter at least one ingredient.");
    }
  };

  const ingredientStringAdd = () => {
    if (inputValue.trim()) {
      setIngredientString([...ingredientString, inputValue.trim()]);
      setInputValue("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What Ingredients Do You Have?</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="e.g., chicken"
          value={inputValue}
          onChangeText={setInputValue}
        />
        <TouchableOpacity style={styles.addButton} onPress={ingredientStringAdd}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {ingredientString.length > 0 && (
        <View style={styles.ingredientsContainer}>
          <Text style={styles.subtitle}>Your Ingredients:</Text>
          <FlatList
            data={ingredientString}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.ingredientTag}>
                <Text style={styles.ingredientText}>{item}</Text>
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}

      <TouchableOpacity style={styles.searchButton} onPress={handleSearchPress}>
        <Text style={styles.searchText}>Next ➡️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBE8D3",
    padding: 24,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#D94F30",
    marginBottom: 20,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#D94F30",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  ingredientsContainer: {
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#4A4A4A",
  },
  ingredientTag: {
    backgroundColor: "#FFF3E0",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
  },
  ingredientText: {
    fontWeight: "600",
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#D94F30",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  searchText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
