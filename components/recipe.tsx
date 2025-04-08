import React from 'react';
import {  Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

interface RecipeProps {
    label: string;
    image: string;
    url: string;
}

export default function Recipe( {label, image, url}: RecipeProps ) {
    const handlePress = () => {
        Linking.openURL(url);
    };
    return(
    <TouchableOpacity onPress={handlePress}>
        <Image source={{ uri: "https://via.placeholder.com/150" }} style={{ width: 100, height: 100 }}/>
        <Text>{label}</Text>
    </TouchableOpacity>
    );
}