import { useState } from 'react'
import '../App.css'
import { XMarkIcon } from '@heroicons/react/24/solid'

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

export default function QuickFinds() {

  const [loading, setLoading] = useState(false)
  const [foodTypes, setFoodTypes] = useState<Recipe[]>([])
//   const [foodTypesNumResults, setFoodTypesNumResults] = useState(5)


  const apiId = import.meta.env.VITE_API_ID
  const apiKey = import.meta.env.VITE_API_KEY

  // handle pre-set food-type filtering
  function loadFoodTypes(foodType: string) {
    setLoading(true)
    fetch (
      `https://api.edamam.com/search?q=${foodType}&app_id=${apiId}&app_key=${apiKey}&from=0&to=5`
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

  function handleRiceClick() {
    loadFoodTypes('rice')
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
      {/* quick picks */}
      <div className='flex flex-row gap-8 m-8  overflow-hidden  overflow-x-visible'>
        <div onClick={handleChickenClick} className=" flex flex-col items-center cursor-pointer  border-2 border-black rounded-3xl  ">
          <img src='chicken.png' className='sm:w-max md:w-3/6 lg:w-2/4 ' /> 
          <p className=''>Chicken</p>
        </div>

        <button onClick={handleBeefClick} className="cursor-pointer">
          <p>Beef</p>
        </button>

        <button onClick={handleFishClick} className="cursor-pointer">
          <p>Fish</p>
        </button>

        <button onClick={handlePorkClick} className="cursor-pointer">
          <p>Pork</p>
        </button>

        <button onClick={handleVegetarianClick} className="cursor-pointer">
          <p>Vegetarian</p>
        </button>

        <button onClick={handleRiceClick}  className="cursor-pointer">
          <p>Rice</p>
        </button>

        <button onClick={handleGlutenFreeClick} className="cursor-pointer">
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
          // <button onClick={closeFoodTypes}>Close</button>
          <XMarkIcon onClick={closeFoodTypes} className='w-14'/>
        ) : (
          null
        )}
      </div>

    </>
  )
}
