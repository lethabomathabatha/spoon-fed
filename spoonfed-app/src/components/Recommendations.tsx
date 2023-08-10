import { useState, useEffect } from 'react'

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

export default function Recommendations() {

  const [loading, setLoading] = useState(false)
  const [randomRecipesData, setRandomRecipesData] = useState<Recipe[]>([])
  const apiId = '9b922e44'
  const apiKey = 'ef7943312809a8647c2d59f53e28994f'
  // const apiId = import.meta.env.VITE_API_ID
  // const apiKey = import.meta.env.VITE_API_KEY

  
 

  // load 10 random results from api
  // Function to load random recipes
  function loadRandomRecipes() {
    setLoading(true)
    fetch(
      `https://api.edamam.com/search?q=random&app_id=${apiId}&app_key=${apiKey}&from=0&to=10`
    )
      .then((res) => res.json())
      .then((data) => {
        // randomise results
        const randomRecipes = data.hits.sort(() => Math.random() - 0.5);
        setRandomRecipesData(randomRecipes);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Fetch Error:', error);
        setLoading(false)
      });
  }

  useEffect(() => {
    loadRandomRecipes();
  }, []);



  // get full recipe instructions from recipe source website
  const getRecipeInstructions = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <>
      {/* recipe caurosel recommendations */}
      <div className='random-results'>
        <p>Random Results</p>
          <div>
            { loading ? (
              <div>Loading...</div>
            ) : (
                <>
                {randomRecipesData.map((recipe) => (
                <div key={recipe.recipe.uri}>
                    <img src={recipe.recipe.image} alt={recipe.recipe.label} />
                    <h3>{recipe.recipe.label}</h3>
                    <button onClick={() => getRecipeInstructions(recipe.recipe.url)}>Instructions</button>
                </div>
                ))}
                </>
            )}
            
          </div>
          
      </div>
    </>
  )
}
