import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="typeSelection" options={{ title: "Meal Type" }} />
      <Tabs.Screen name="allergies" options={{ title: "Allergies" }} />
      <Tabs.Screen name="mainItems" options={{ title: "Main Items" }} />
      <Tabs.Screen name="vegetables" options={{ title: "Vegetables" }} />
      <Tabs.Screen name="style" options={{ title: "Style" }} />
      <Tabs.Screen name="searchRecipes" options={{ title: "Find Recipe" }} />
      <Tabs.Screen name="returnRecipes" options={{ title: "Recipes"}} />
    </Tabs>
  );
}
