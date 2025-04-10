import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../components/header';

export default function TypeSelection() {
  const router = useRouter();

  const handleTypePress = (mealType: string) => {
    router.push({
      pathname: '/findRecipe/allergies',
      params: { mealType },
    });
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Let’s Get Cooking!</Text>

      <View style={styles.imageWrapper}>
        <Image
          source={require('../../assets/ChefMateLogo.jpg')}
          style={styles.image}
        />
      </View>

      <Text style={styles.subtitle}>What are you feeling?</Text>

      <View style={styles.optionsWrapper}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => handleTypePress('breakfast')}
        >
          <Text style={styles.optionText}>➕ Breakfast</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => handleTypePress('lunch')}
        >
          <Text style={styles.optionText}>➕ Lunch</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => handleTypePress('dinner')}
        >
          <Text style={styles.optionText}>➕ Dinner</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => handleTypePress('dessert')}
        >
          <Text style={styles.optionText}>➕ Dessert</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBackToHome}
      >
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FBE8D3',
      padding: 24,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#3B3131',
      marginTop: 40,
      marginBottom: 20,
    },
    subtitle: {
      fontSize: 20,
      fontWeight: '500',
      color: '#3B3131',
      marginBottom: 20,
    },
    imageWrapper: {
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
      marginBottom: 20,
    },
    image: {
      width: 160,
      height: 160,
      borderRadius: 12,
    },
    optionsWrapper: {
      width: '100%',
      backgroundColor: '#3B3131',
      borderRadius: 20,
      padding: 16,
    },
    optionButton: {
      backgroundColor: '#fff',
      paddingVertical: 12,
      borderRadius: 12,
      marginVertical: 6,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    optionText: {
      fontSize: 18,
      color: '#3B3131',
      fontWeight: 'bold',
    },
    backButton: {
      backgroundColor: '#D94F30',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 12,
      marginTop: 30,
    },
      backButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
      },
  });
  