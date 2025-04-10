import { CallAPIProps, RecipeResponse } from "../interfaces/interfaces";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY!;
const API_HOST = process.env.EXPO_PUBLIC_API_HOST!;
const API_ID = process.env.EXPO_PUBLIC_API_ID!;

interface QueryParams {
  ingredients: string[];
  allergies: string[];
  mealType: string;
}

export default function useApiCall({
  triggerSearch,
  resetTrigger,
  setRecipes,
  setError,
}: CallAPIProps) {
  function triggerApi({ ingredients, allergies, mealType }: QueryParams) {
    const searchRecipes = async () => {
      setRecipes([]);
      setError("");

      if (!ingredients || ingredients.length === 0) {
        setError("Please retry your selection");
        return;
      }

      const searchKeywords = ingredients.map(encodeURIComponent).join(" ");
      const allergyParams = allergies.map((a) => `&health=${a}`).join("");
      const mealTypeParam = mealType ? `&mealType=${mealType}` : "";

      const url = `${API_HOST}?type=public&beta=false&q=${searchKeywords}${allergyParams}${mealTypeParam}&app_id=${API_ID}&app_key=${API_KEY}`;

      console.log("Fetching from:", url);

      try {
        const response = await fetch(url);

        if (!response.ok) {
          const errorData = await response.json();
          const errorMessage = errorData?.message || `HTTP error! Status: ${response.status}`;
          throw new Error(errorMessage);
        }

        const data = (await response.json()) as RecipeResponse;

        if (data.hits && data.hits.length > 0) {
          const firstFiveHits = data.hits.slice(0, 5);
          setRecipes(firstFiveHits);
        } else {
          setError("No recipes found for this selection.");
        }
      } catch (err: any) {
        console.error("Caught error:", err);
        setError(`Error fetching recipes: ${err.message}`);
      }
    };

    if (triggerSearch) {
      searchRecipes();
      resetTrigger();
    }
  }

  return triggerApi;
}
