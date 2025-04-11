import React, { useState} from 'react';
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native';

export default function TypeSelection(){
    const [ingredientString, setIngredientString] = useState<string[]>([]);

    const mainMeal = {
        1 : '&beef',
        2 : '&chicken',
        3 : '&lamb',
        4 : '&seafood',
        5 : '&fish',
        6 : '&beans',
        7 : '&pork',
        8 : '&eggs',
    };

    const handleMainPress = (value: string) => {
        if(ingredientString.includes(value)) {
            setIngredientString(ingredientString.filter((item) => item ! == value));
        } else {
            setIngredientString([...ingredientString, value]);
        }
    };

    

    return(
        <SafeAreaView>
            <FlatList
                data={Object.entries(mainMeal)}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleMainPress(item[1])}>
                        <Text>{item[1]}</Text> 
                    </TouchableOpacity>    
                )}
                keyExtractor={(item) => item[0]}
            />
    </SafeAreaView>
    );
}