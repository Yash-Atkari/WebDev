export default function Recipes({ recipes }) {
    return (
        <div>
            {recipes.map((recipeItem, idx) => {
                return (
                    <div key={idx}>
                        <h2>{idx+1}. {recipeItem.recipe.label}</h2>
                        <img src={recipeItem.recipe.image} alt="recipe image" />

                        <h3>-Ingredients-</h3>
                        {recipeItem.recipe.ingredients.map((ingredient, idx) => {
                            return (
                                <li key={idx}>{ingredient.text}</li>
                            );
                        })}

                        <h3>-Recipe-</h3>
                        <a href={recipeItem.recipe.url} target="_blank" rel="noopener noreferrer">Read more...</a>
                        <hr />
                    </div>
                );
            })}
        </div>
    );
}
