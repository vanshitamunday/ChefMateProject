import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Header from '../../components/header';
import { SafeAreaView } from 'react-native';

const { width } = Dimensions.get('window');

const healthOptions = [
  'celery-free',
  'seafood-free',
  'dairy-free',
  'egg-free',
  'fish-free',
  'gluten-free',
  'lupine-free',
  'mustard-free',
  'peanut-free',
  'sesame-free',
  'shellfish-free',
  'soy-free',
  'tree-nut-free',
  'wheat-free',
];

export default function Allergies() {
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const router = useRouter();
  const { mealType } = useLocalSearchParams();

  const handleToggle = (item: string) => {
    if (selectedAllergies.includes(item)) {
      setSelectedAllergies(selectedAllergies.filter((a) => a !== item));
    } else {
      setSelectedAllergies([...selectedAllergies, item]);
    }
  };

  const handleNext = () => {
    router.push({
      pathname: '/findRecipe/searchRecipes',
      params: {
        mealType: mealType,
        allergies: selectedAllergies.join(','),
      },
    });
  };

  const renderAllergy = ({ item }: { item: string }) => {
    const isSelected = selectedAllergies.includes(item);

    return (
      <TouchableOpacity
        style={[
          styles.allergyButton,
          isSelected && { backgroundColor: '#D94F30' },
        ]}
        onPress={() => handleToggle(item)}
      >
        <Text style={[styles.allergyText, isSelected && { color: '#fff' }]}>
          ➕ {item.replace(/-/g, ' ').replace('free', 'free')}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={styles.title}>Any Allergies or{'\n'}restrictions?</Text>

      <View style={styles.wrapper}>
        <FlatList
          data={healthOptions}
          renderItem={renderAllergy}
          keyExtractor={(item) => item}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextText}>Next ➡️</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBE8D3',
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B3131',
    textAlign: 'center',
    marginVertical: 24,
    marginTop: 80,
  },
  wrapper: {
    width: '100%',
    backgroundColor: '#3B3131',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  allergyButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: (width - 96) / 2, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  allergyText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3B3131',
  },
  nextButton: {
    backgroundColor: '#D94F30',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  nextText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});