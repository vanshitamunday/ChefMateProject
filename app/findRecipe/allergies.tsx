import React, { useState} from 'react';
import { Text, View, FlatList } from "react-native";
import { TouchableOpacity } from 'react-native';

export default function TypeSelection(){
    const [healthRelated, setHealthRelated] = useState<string[]>([]);

    const healthTypes = {
        1 : '&health=celery-free',
        2 : '&health=seafood-free',
        3 : '&health=dairy-free',
        4 : '&health=egg-free',
        5 : '&health=fish-free',
        6 : '&health=gluten-free',
        7 : '&health=lupine-free',
        8 : '&health=mustard-free',
        9 : '&health=peanut-free',
        10 : '&health=sesame-free',
        11 : '&health=shellfish-free',
        12 : '&health=soy-free',
        13 : '&health=tree-nut-free',
        14 : '&health=wheat-free',
    };

    const handleHealthPress = (value: string) => {
        if(healthRelated.includes(value)) {
            setHealthRelated(healthRelated.filter((item) => item ! == value));
        } else {
            setHealthRelated([...healthRelated, value]);
        }
    };

    

    return(
        <View>
            <FlatList
                data={Object.entries(healthTypes)}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleHealthPress(item[1])}>
                        <Text>{item[1]}</Text> 
                    </TouchableOpacity>    
                )}
                keyExtractor={(item) => item[0]}
            />
    </View>
    );
}