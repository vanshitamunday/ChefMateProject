import { CallAPIProps, RecipeResponse } from "../interfaces/interfaces";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY!;
const API_HOST = process.env.EXPO_PUBLIC_API_HOST!;
const API_ID = process.env.EXPO_PUBLIC_API_ID!;

export default function useApiCall({
  triggerSearch,
  resetTrigger,
  setRecipes,
  setError,
}: CallAPIProps) {
  function triggerApi(queryArray: string[]) {
    console.log("CallAPI useEffect: triggerSearch =", triggerSearch);

    const searchRecipes = async (queryParams: string[]) => {
      setRecipes([]);
      setError("");

      if (!queryParams || queryParams.length === 0) {
        console.log("CallAPI: searchRecipes called with empty query");
        setError("Please retry your selection");
        return;
      }

      const searchKeywords = queryParams.filter(
        (item) => !item.startsWith("&")
      ).join(" ");

      const filters = queryParams.filter((item) => item.startsWith("&")).join("");

      const url = `${API_HOST}?type=public&beta=false&q=${encodeURIComponent(
        searchKeywords
      )}${filters}&app_id=${API_ID}&app_key=${API_KEY}`;

      console.log("CallAPI: Fetching from", url);

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
          console.log("CallAPI: firstFiveHits", firstFiveHits);
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
      searchRecipes(queryArray);
      resetTrigger();
    }
  }

  return triggerApi;
}
