import { useState } from 'react'
import './App.css'

// Define a type for the recipe data
interface Recipe {
  recipe: {
    label: string;
    image: string;
  }
  
}

export default function App() {
  const [count, setCount] = useState(0)
  const [recipesData, setRecipesData] = useState<Recipe[]>([]) 
  const [query, setQuery] = useState('')
  const [searchIngredients, setSearchIngredients] = useState('')
  const apiId = import.meta.env.VITE_API_ID
  const apiKey = import.meta.env.VITE_API_KEY

  // handle search from api
  const handleSearch = () => {
    const searchQuery = `${query},${searchIngredients}`
    fetch(
      `https://api.edamam.com/search?q=${searchQuery}&app_id=${apiId}&app_key=${apiKey}`
    ) 
      .then((res) => res.json())
      .then((data) => {
        setRecipesData(data.hits);
      })
  }

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <br />
        <input
          type="text"
          placeholder="Enter a dish"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <br />
        <input
          type="text"
          value={searchIngredients}
          onChange={(e) => setSearchIngredients(e.target.value)}
          placeholder="Enter ingredients (comma-separated)"
        />
        <br/>
        <button onClick={handleSearch}>Search</button>

        {recipesData.map((recipe, index) => (
          <div key={index}>
            <h2>{recipe.recipe.label}</h2>
            <img src={recipe.recipe.image} alt={recipe.recipe.label} />
          </div>
        ))}
      </div>
    </>
  )
}
