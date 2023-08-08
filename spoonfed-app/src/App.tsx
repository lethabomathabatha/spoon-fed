import { useState } from 'react'
import './App.css'

// custom type definition for recipe data
type Recipe = {
    key: string;
    recipe: {
      uri: string;
      label: string;
      image: string;
      ingredients: string[];
      url: string;
      thumbnailImages: string[];
      totalTime: number;
      source: string;
      yield: number;
      cuisineType: string;
    }
 
}

export default function App() {

  const [loading, setLoading] = useState(false)
  const [recipesData, setRecipesData] = useState<Recipe[]>([]) 
  // const [query, setQuery] = useState('')
  const [searchIngredients, setSearchIngredients] = useState('')
  const [numOfResults, setNumOfResults] = useState(10)
  // const apiId = import.meta.env.VITE_API_ID
  // const apiKey = import.meta.env.VITE_API_KEY

  const apiId = '9b922e44'
  const apiKey = 'ef7943312809a8647c2d59f53e28994f'
  
  // handle search from api
  const handleSearch = () => {
    setLoading(true);
    const searchQuery = `${searchIngredients}`
    fetch(
      `https://api.edamam.com/search?q=${searchQuery}&app_id=${apiId}&app_key=${apiKey}&from=0&to=${numOfResults}`
    ) 
      .then((res) =>{
        if (!res.ok) {
          throw new Error(`Failed to fetch! status: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        setRecipesData(data.hits);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Fetch Error:', error)
        setLoading(false)
      })
  };

  // load more recipes
  function loadMore() {
    setLoading(true)
    setNumOfResults((prevResults => prevResults + 10))
    handleSearch()
    setLoading(false)
  }

  // these work as expected
  // console.log(import.meta.env.VITE_API_KEY)
  // console.log(import.meta.env.VITE_API_ID)

  // handle get all recipes
  // const handleGetAllRecipes = () => {
  //   fetch('/api/recipe')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setRecipesData(data);
  //     })
  // }

  // get full recipe instructions from recipe source website
  const getRecipeInstructions = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <>
      <h1>Recipe Finder</h1>
      <span>It's okay to be spoonfed.</span>
      
      <div>  
        <br />
        {/* search bar for ingredients */}
        <input
          type="text"
          value={searchIngredients}
          onChange={(e) => setSearchIngredients(e.target.value)}
          placeholder="Enter ingredients (comma-separated)"
        />
        
        <button onClick={handleSearch}>Search</button>
        <br />
        {/* <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find specific meal"
        />
        
        <button onClick={handleGetAllRecipes}>Search</button> */}

        {/* fetch and map through recipe data */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className='results'>
            {recipesData.map((recipe) => (
              <div key={recipe.recipe.uri}>
                <img src={recipe.recipe.image} alt={recipe.recipe.label} />
                <h3>{recipe.recipe.label}</h3>
                <h2>{recipe.recipe.source}</h2>
                <h2>serves: {recipe.recipe.yield}</h2>

                <h4>Ingredients:</h4>
                <ul>
                  {recipe.recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.text}</li>
                  ))}
                  {recipe.recipe.totalTime === 0 ? (null) 
                    : 
                  (<p>{recipe.recipe.totalTime}min </p>)}
                  
                </ul>

                <button onClick={() => getRecipeInstructions(recipe.recipe.url)}>Get Instructions</button>
              </div>
            ))}

            <button onClick={loadMore}>Get More</button>

          </div>
        )}

      </div>
    </>
  )
}
