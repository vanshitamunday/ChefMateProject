export interface RecipeProps {
    label: string;
    image: string;
    url: string;
}

export interface RecipeData {
    recipes: RecipeProps[];
}

export interface CallAPIProps {    
    triggerSearch: boolean;
    resetTrigger: () => void;
    setRecipes: (recipes: any[] | null) => void; // Add setRecipes prop
    setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface HomeScreenProps {
    userName: string | null;
}

export interface RecipeHit {
    recipe: RecipeProps;
}

export interface RecipeResponse {
    hits: RecipeHit[];
}