import { View, FlatList, StyleSheet } from "react-native";
import Recipe from './recipe';
import { RecipeData } from '../interfaces/interfaces';



    
    export default function RecipeList({ recipes }: RecipeData) {
    
    return (
        <View>
            <FlatList
                data={recipes}
                renderItem={({ item }) => (
                    <Recipe
                        label={item.label}
                        image={item.image}
                        url={item.url}
                    />
                )}
                keyExtractor={(item) => item.url}
            />
        </View>
    );
}