import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Recipe from "./recipe";
import { RecipeHit } from "../interfaces/interfaces";

interface RecipeListProps {
  recipes: RecipeHit[];
}

export default function RecipeList({ recipes }: RecipeListProps) {
  return (
    <FlatList
      data={recipes}
      renderItem={({ item }) => (
        <Recipe
          label={item.recipe.label}
          image={item.recipe.image}
          url={item.recipe.url}
        />
      )}
      keyExtractor={(item) => item.recipe.url}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 30,
    paddingHorizontal: 8,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
});
