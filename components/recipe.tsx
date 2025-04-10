import React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  View,
} from 'react-native';
import { RecipeProps } from '../interfaces/interfaces';

export default function Recipe({ label, image, url }: RecipeProps) {
  const handlePress = () => {
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.label} numberOfLines={2}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    flex: 1,
    marginHorizontal: 6,
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  textContainer: {
    padding: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3B3131",
  },
});
