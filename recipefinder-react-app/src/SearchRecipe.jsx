import { useState } from "react";
import Recipes from "./Recipes";

export default function SearchRecipe() {
    let [recipe, setRecipe] = useState(``);
    let [recipes, setRecipes] = useState([]);

    let handleInput = (event) => {
        setRecipe(event.target.value);
    }

    let recipeFinder = async (recipe) => {
        let app_id = `e156b132`;
        let app_key = `e3d0259d0d04c8d59cb060635d56556e`;
        try {
            let res = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${recipe}&app_id=${app_id}&app_key=${app_key}`);
            if (!res.ok) throw new Error("Failed to fetch recipes");
            let data = await res.json();
            setRecipes(data.hits);
        } catch(err) {
            console.log("Error", err);
        }
        setRecipe("");
    }

    return (
        <div>
            <h1>Recipe Finder App</h1>
            <form onSubmit={(event) => {event.preventDefault(); recipeFinder(recipe);}}>
                <input type="text" placeholder="search recipe item" value={recipe} onChange={handleInput} required/>
                <button type="submit">Search</button>
            </form>

        <Recipes recipes={recipes}/>
        </div>
    );
}
