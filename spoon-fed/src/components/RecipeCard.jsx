import * as React from 'react';
import * as Mui from '@mui/material';

export default function RecipeCard() {
    return (
        <div>
<h2>Recipe Finder</h2>
<input
  type="text"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  placeholder="Enter a dish"
/>
<input
  type="text"
  value={searchIngredients}
  onChange={(e) => setSearchIngredients(e.target.value)}
  placeholder="Enter ingredients (comma-separated)"
/>
<button onClick={handleSearch}>Search</button>
<Mui.Button variant="contained">Hello World</Mui.Button>
<button onClick={handleGetAllRecipes}>Get All Recipes</button>
{loading ? (
  <p>Loading...</p>
) : (
  <div>
    {recipesData.map((recipe) => (
      <div key={recipe.recipe.uri}>
        <img src={recipe.recipe.image} alt={recipe.recipe.label} />
        <h3>{recipe.recipe.label}</h3>
        <h4>Ingredients:</h4>
        <ul>
          {recipe.recipe.ingredients.map((ingredient) => (
            <li key={ingredient.food}>{ingredient.text}</li>
          ))}
        </ul>
        
        <button onClick={() => openRecipeUrl(recipe.recipe.url)}>Get Instructions</button>
      </div>
    ))}
  </div>
)}
</div>
    )
}
