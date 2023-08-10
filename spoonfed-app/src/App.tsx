import { useEffect, useState } from 'react'
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
  const [randomRecipesData, setRandomRecipesData] = useState<Recipe[]>([])
  const [foodTypes, setFoodTypes] = useState<Recipe[]>([])
  const [foodTypesNumResults, setFoodTypesNumResults] = useState(5)
  const [searchIngredients, setSearchIngredients] = useState('')
  const [numOfResults, setNumOfResults] = useState(10)

  const apiId = '9b922e44'
  const apiKey = 'ef7943312809a8647c2d59f53e28994f'
  // const apiId = import.meta.env.VITE_API_ID
  // const apiKey = import.meta.env.VITE_API_KEY

  
  
  // handle search from api
  const handleSearch = () => {
    setLoading(true);
    setNumOfResults(10);
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
  }

  // load 10 random results from api
  // Function to load random recipes
  function loadRandomRecipes() {
    fetch(
      `https://api.edamam.com/search?q=random&app_id=${apiId}&app_key=${apiKey}&from=0&to=${numOfResults}`
    )
      .then((res) => res.json())
      .then((data) => {
        // randomise results
        const randomRecipes = data.hits.sort(() => Math.random() - 0.5);
        setRandomRecipesData(randomRecipes);
      })
      .catch((error) => {
        console.log('Fetch Error:', error);
      });
  }

  useEffect(() => {
    loadRandomRecipes();
  }, []);

  // handle pre-set food-type filtering
  function loadFoodTypes(foodType: string) {
    setLoading(true)
    fetch (
      `https://api.edamam.com/search?q=${foodType}&app_id=${apiId}&app_key=${apiKey}&from=0&to=${foodTypesNumResults}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch! status: ${res.status}`)
        }  
        return res.json()
      })
      .then((data) => {
        setFoodTypes(data.hits);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Fetch Error:', error)
        setLoading(false)
      })
  }

  // useEffect(() => {
  //   loadFoodTypes();
  // }, [ foodTypesNumResults ]);

  function closeFoodTypes() {
    setFoodTypes([])
  }

  // click handlers for different food types
  function handleChickenClick() {
    loadFoodTypes('chicken')
  }

  function handleBeefClick() {
    loadFoodTypes('beef')
  }

  function handleFishClick() {
    loadFoodTypes('fish')
  }

  function handlePorkClick() {
    loadFoodTypes('pork')
  }

  function handleVegetarianClick() {
    loadFoodTypes('vegetarian')
  }

  function handleVeganClick() {
    loadFoodTypes('vegan')
  }

  function handleGlutenFreeClick() {
    loadFoodTypes('gluten free')
  }


  // get full recipe instructions from recipe source website
  const getRecipeInstructions = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <>
    
      <h1 className='title'>Recipe Finder</h1>
      <span>It's okay to be spoonfed.</span>
      
      <div className='search'>  
        <br />
        {/* search bar for ingredients */}
        <input
          type="text"
          value={searchIngredients}
          onChange={(e) => setSearchIngredients(e.target.value)}
          placeholder="Enter ingredients"
        />
        
        <button onClick={handleSearch}>Search</button>
        <br />

        

        <br/>
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
          </div>

        )}

      {/* conditionally render 'load more' button if search results are greater than 10 */}
      { recipesData.length >= 10 ? (
          <button onClick={loadMore}>Load More</button>
        ) : <></>}
      
      </div>

      {/* recipe caurosel recommendations */}
      <div className='random-results'>
        <p>Random Results</p>
          <div>
            {randomRecipesData.map((recipe) => (
              <div key={recipe.recipe.uri}>
                <img src={recipe.recipe.image} alt={recipe.recipe.label} />
                <h3>{recipe.recipe.label}</h3>
              </div>
            ))}
          </div>
      </div>
      


      {/* quick picks */}
      <div className='quick-picks'>
        <button onClick={handleChickenClick} style={{cursor: 'pointer'}}>
          <p>Chicken</p>
        </button>

        <button onClick={handleBeefClick} style={{cursor: 'pointer'}}>
          <p>Beef</p>
        </button>

        <button onClick={handleFishClick} style={{cursor: 'pointer'}}>
          <p>Fish</p>
        </button>

        <button onClick={handlePorkClick} style={{cursor: 'pointer'}}>
          <p>Pork</p>
        </button>

        <button onClick={handleVegetarianClick} style={{cursor: 'pointer'}}>
          <p>Vegetarian</p>
        </button>

        <button onClick={handleVeganClick} style={{cursor: 'pointer'}}>
          <p>Vegan</p>
        </button>

        <button onClick={handleGlutenFreeClick} style={{cursor: 'pointer'}}>
          <p>Gluten Free</p>
        </button>


        {/* render selected food type results */}
        { loading ? (
          <p>Loading...</p>
        ) : (
          foodTypes.map((recipe) => (
            <div key={recipe.recipe.uri} className='quick-picks-results'>
              <img src={recipe.recipe.image} alt={recipe.recipe.label} />
              <h3>{recipe.recipe.label}</h3>
              <button onClick={() => getRecipeInstructions(recipe.recipe.url)}>Get Instructions</button>
            </div>
             
          ))
          
        )}

        {/* conditionally render when quick-picks-results is open, remove when not */}
        {foodTypes.length > 0 ? (
          <button onClick={closeFoodTypes}>Close</button>
        ) : (
          <div></div>
        )}

      


        {/* 
        <p>Vegetarian</p>
        <p>Pasta</p>
        <p>Vegan</p>
        <p>Gluten Free</p> */}
      </div>

    </>
  )
}
