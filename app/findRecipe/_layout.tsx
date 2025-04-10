import { Stack } from 'expo-router';

export default function RecipesLayout() {
  return (
    <Stack>
      <Stack.Screen name="typeSelection" options={{ title: 'Meal Type' }} />
      <Stack.Screen name="allergies" options={{ title: 'Allergies' }} />
      <Stack.Screen name="mainItems" options={{ title: 'Main Items' }} />
      <Stack.Screen name="vegetables" options={{ title: 'Vegetables' }} />
      <Stack.Screen name="returnRecipes" options={{ title: 'Recipes' }} />
    </Stack>
  );
}