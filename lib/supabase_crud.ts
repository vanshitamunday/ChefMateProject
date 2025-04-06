import supabase from "./supabase";

const TABLE_NAME = "user_details";

export async function getUsers() {
    try {
        const { data, error } = await supabase.from(TABLE_NAME).select("*");
        if (error) {
            console.error("Error fetching users:", error.message);
            return { data: null, error };
        }
        return { data, error: null };
    } catch (error) {
        console.error("Unexpected error fetching users:", error);
        return { data: null, error };
    }
}
