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
import Header from "../../components/header";

const ingredientList = [
  "Beef",
  "Chicken",
  "Lamb",
  "Seafood",
  "Fish",
  "Beans",
  "Pork",
  "Eggs",
];

export default function SearchRecipes() {
  const [ingredientString, setIngredientString] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

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

  const handleIngredientSelect = (ingredient: string) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter((item) => item !== ingredient));
      setIngredientString(ingredientString.filter((item) => item !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
      setIngredientString([...ingredientString, ingredient]); 
    }
  };

  return (
    <View style={styles.container}>
      <Header />
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

      <Text style={styles.subtitle}>Choose an ingredient:</Text>
      <View style={styles.ingredientButtonsWrapper}>
        <FlatList
          data={ingredientList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.ingredientButton,
                selectedIngredients.includes(item) && { backgroundColor: "#4CAF50" },
              ]}
              onPress={() => handleIngredientSelect(item)}
            >
              <Text style={styles.ingredientButtonText}>
                {selectedIngredients.includes(item) ? "✔️ " : "➕ "}
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />
      </View>

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
    marginTop: 60,
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
    fontSize: 16,
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
  ingredientButtonsWrapper: {
    marginBottom: 24,
    backgroundColor: "#3B3131",
    borderRadius: 20,
    padding: 16,
  },
  ingredientButton: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginBottom: 12,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  ingredientButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3B3131",
    textAlign: "center",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 12,
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