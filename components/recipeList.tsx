import { View, FlatList, StyleSheet } from "react-native";
import Recipe from './recipe';


    interface RecipeData {
        recipe: {
        label: string;
        image: string;
        url: string;
        };
    }

    interface RecipeListProps {
        recipes: RecipeData [];
    }
    export default function RecipeList({ recipes }: RecipeListProps) {
    console.log("RecipeList received recipes:", recipes);
    return (
        <View>
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
            />
        </View>
    );
}