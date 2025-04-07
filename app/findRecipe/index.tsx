import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput } from "react-native";
import { useRouter } from "expo-router";
import CallAPI from "../../components/apiCall";


const Index = () => {
    const [triggerSearch, setTriggerSearch] = useState(false);
    const [ingredients, setIngredients] = useState('');

    const handleSearchPress = () => {
        if (ingredients.trim()) {
            setTriggerSearch(true);
        } else {
            Alert.alert("Please enter ingredients to search.");
        }
    };

    const resetTrigger = () => {
        setTriggerSearch(false);
      };

    return (
        <View>
            <Text>Find a recipe</Text>
            <TextInput
                placeholder="Enter Ingredients (ex chicken)"
                value={ingredients}
                onChangeText={setIngredients}
            />
            <TouchableOpacity onPress={handleSearchPress}>
                <Text>Search</Text>
            </TouchableOpacity>

            {triggerSearch && (
                <CallAPI
                    ingredientString={ingredients}
                    triggerSearch={triggerSearch}
                    resetTrigger={resetTrigger}
                />
            )}
        </View>
    );
};

export default Index;

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
