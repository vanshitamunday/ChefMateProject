import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import RecipeList from './recipeList';
// When this component is called, it will send an API request to Edemam with the string created by the user using the app
// If there are any recipes returned, it will list the top 5 in a flat list that is touchable and will lead to the recipe on click.
// If there are none, it will return an error.

const API_KEY = process.env.EXPO_PUBLIC_API_KEY!;
const API_HOST = process.env.EXPO_PUBLIC_API_HOST!;
const API_ID = process.env.EXPO_PUBLIC_API_ID!;

interface CallAPIProps {
    ingredientString: string;
    triggerSearch: boolean;
    resetTrigger: () => void;
}
export default function CallAPI({ ingredientString, triggerSearch, resetTrigger }: CallAPIProps) {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        console.log("CallAPI useEffect: triggerSearch =", triggerSearch);
        if (triggerSearch) {
            searchRecipes(ingredientString);
            resetTrigger();
        }        
    }, [triggerSearch, ingredientString, resetTrigger]);

    const searchRecipes = async (currentIngredients: string) => {
        setRecipes([]);
        setError('');
        setLoading(true);

        if (!currentIngredients.trim()) {
            console.log("CallAPI: searchRecipes called with", currentIngredients);
            setError("Please retry your selection");
            setLoading(false);
            return;
        }
        
        const encodedIngredients = encodeURIComponent(currentIngredients);

        const url =  `${API_HOST}?type=public&beta=false&q=${encodedIngredients}&app_id=${API_ID}&app_key=${API_KEY}`;
        console.log("CallAPI: Fetching from", url);
        
        try
        {
            const response = await fetch(url);
            if(!response.ok) 
            {
                const errorData = await response.json();
                const errorMessage = errorData?.message || `HTTP error! Status: ${response.status}`;
                throw new Error(errorMessage);
            }
            const data = await response.json();
            console.log("API Response:", data);
            if (data.hits && data.hits.length > 0)
            {
                const firstFiveHits = data.hits.slice(0, 5);
                console.log("CallAPI: firstFiveHits", firstFiveHits);
                setRecipes(firstFiveHits);
            } else
            {
                setError("No recipes found for this selection.")
            }
        } catch (err: any) {
            console.error("Caught error:", err);
            setError(`Error fetching recipes: ${err.message}`);
            console.log("CallAPI: Error message:", err.message);
        } finally {
            setLoading(false);
            console.log("CallAPI: searchRecipes finished, loading =", loading, "error =", error);
        }
    };

   if (loading){
    console.log("CallAPI: Loading is true");
    return null;
   }
   if (error){
    console.log("CallAPI: Error is true:", error);
    return null;
   } 
   console.log("CallAPI: Returning recipes:", recipes);
   return recipes;
}