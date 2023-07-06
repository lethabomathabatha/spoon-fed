

import React from 'react';

export default function App() {
  const [recipesData, setRecipesData] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const [searchIngredients, setSearchIngredients] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const appId = '9b922e44';
  const appKey = '73488167b099164fd2f8e014ec845b66';

  const handleSearch = () => {
    setLoading(true);
    const searchQuery = `${query},${searchIngredients}`;
    fetch(
      `https://api.edamam.com/search?q=${searchQuery}&app_id=${appId}&app_key=${appKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRecipesData(data.hits);
        setLoading(false);
      });
  };

  const handleGetAllRecipes = () => {
    setLoading(true);
    fetch('/api/recipe')
      .then((res) => res.json())
      .then((data) => {
        setRecipesData(data);
        setLoading(false);
      });
  };

  const openRecipeUrl = (url) => {
    window.open(url, '_blank');
  };

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
  );
}
