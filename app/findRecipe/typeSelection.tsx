import React, { useState} from 'react';
import { Text, View } from "react-native";
import { TouchableOpacity } from 'react-native';

export default function TypeSelection(){
    const [ingredientsString, setIngredientsString] = useState<string[]>([]);
    const [type, selectType] = useState('');

    const types = {
        1 : 'dinner',
        2 : 'breakfast',
        3 : 'lunch',
        4 : 'dessert',
    }    

    const handlePressDinner = () => {
        selectType(types[1]);
        setIngredientsString([...ingredientsString, type]);
    };

    const handlePressBreakfast = () => {
        selectType(types[2]);
        setIngredientsString([...ingredientsString, type]);
    }

    const handlePressLunch = () => {
        selectType(types[3]);
        setIngredientsString([...ingredientsString, type]);
    }

    const handlePressDessert = () => {
        selectType(types[4]);
        setIngredientsString([...ingredientsString, type]);
    }

    

    return(
        <View>
            <Text>What do you feel like today?</Text>
                <TouchableOpacity onPress={handlePressDinner}>
                    <Text>Dinner</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePressBreakfast}>
                    <Text>Lunch</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePressLunch}>
                    <Text>Breakfast</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePressDessert}>
                    <Text>Dessert</Text>
                </TouchableOpacity>
    </View>
    );
}