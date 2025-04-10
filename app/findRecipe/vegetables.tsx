import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function Vegetables() {
  const [vegetables, setVegetables] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();
  const { mealType, allergies} = useLocalSearchParams();

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !vegetables.includes(trimmed)) {
      setVegetables([...vegetables, trimmed]);
      setInputValue('');
    }
  };

  const handleRemove = () => {
    setVegetables((prev) => prev.slice(0, -1)); // remove last item
  };

  const handleSubmit = () => {
    router.push({
      pathname: '/findRecipe/returnRecipe',
      params: {
        mealType,
        allergies,
        ingredients: vegetables.join(','), // pass vegetables as comma string
        triggerSearch: 'true',
      },
    });
  };

  const renderChip = ({ item }: { item: string }) => (
    <View style={styles.ingredientChip}>
      <Text style={styles.ingredientText}>➕ {item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Any vegetables or{'\n'}grains?</Text>

      <View style={styles.chipBox}>
        <FlatList
          data={vegetables}
          renderItem={renderChip}
          keyExtractor={(item, index) => item + index}
          horizontal={false}
          numColumns={2}
          columnWrapperStyle={styles.chipRow}
          ListEmptyComponent={<Text style={styles.emptyText}> </Text>}
        />
      </View>

      <Text style={styles.inputLabel}>Add Ingredients:</Text>

      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Mushrooms"
          value={inputValue}
          onChangeText={setInputValue}
        />
        <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
          <Text style={styles.addText}>＋</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
          <Text style={styles.removeText}>－</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
        <Text style={styles.nextText}>Search Recipes 🍲</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBE8D3',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B3131',
    textAlign: 'center',
    marginBottom: 20,
  },
  chipBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    minHeight: 120,
    marginBottom: 20,
    elevation: 3,
  },
  chipRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  ingredientChip: {
    backgroundColor: '#FDF1E6',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    margin: 4,
    alignSelf: 'flex-start',
  },
  ingredientText: {
    fontWeight: 'bold',
    color: '#3B3131',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#3B3131',
  },
  inputSection: {
    flexDirection: 'row',
    backgroundColor: '#3B3131',
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  addText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#D32F2F',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  removeText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#D94F30',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#AAA',
  },
});
