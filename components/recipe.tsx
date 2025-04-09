import React from 'react';
import {  Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { RecipeProps } from '../interfaces/interfaces';


export default function Recipe( {label, image, url}: RecipeProps ) {
    const handlePress = () => {
        Linking.openURL(url);
    };
    return(
    <TouchableOpacity onPress={handlePress}>
        <Image source={{uri: image }} style={{ width: 100, height: 100 }}/>
        <Text>{label}</Text>
    </TouchableOpacity>
    );
}   