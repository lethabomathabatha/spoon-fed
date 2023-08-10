import { useState, useEffect, useRef } from 'react'
import '../App.css'
import { SunIcon } from '@heroicons/react/24/solid'
import { MoonIcon } from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { ClockIcon } from '@heroicons/react/24/outline'
import { HeartIcon } from '@heroicons/react/24/outline'

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

export default function Search() {

  const [loading, setLoading] = useState(false)
  const [recipesData, setRecipesData] = useState<Recipe[]>([]) 
  const [searchIngredients, setSearchIngredients] = useState('')
  const [numOfResults, setNumOfResults] = useState(4)
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState<number | null>(null);

  const apiId = '9b922e44'
  const apiKey = 'ef7943312809a8647c2d59f53e28994f'
  // const apiId = import.meta.env.VITE_API_ID
  // const apiKey = import.meta.env.VITE_API_KEY

  
  
  // handle search from api
  const handleSearch = () => {
    setLoading(true);
    setNumOfResults(4);
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
    setNumOfResults((prevResults => prevResults + 4))
    handleSearch()
  }

  // display selected recipe's overlay
  function toggleRecipeOverlay(recipeIndex: number | null) {
    if (selectedRecipeIndex === recipeIndex) {
      setSelectedRecipeIndex(null)
    } else {
    setSelectedRecipeIndex(recipeIndex);
  }



  // get full recipe instructions from recipe source website
  // const getRecipeInstructions = (url: string) => {
  //   window.open(url, '_blank')
  // }

  // time-based greeting message
  const [greetingIcon, setGreetingIcon] = useState(<SunIcon className="h-4 w-4"/>)
  const greetingRef = useRef<string>(''); // Create a ref to store the greeting

  useEffect(() => {
    const time = new Date().getHours();
    if (time >= 3 && time < 12) {
      greetingRef.current = `Good Morning`;
      setGreetingIcon(<SunIcon className="h-4 w-4" />)
    } else if (time >= 12 && time < 18) {
      greetingRef.current = `Good Afternoon`;
      setGreetingIcon(<SunIcon className="h-4 w-4" />)
    } else if (time >= 18 && time < 24) {
      greetingRef.current = `Good Evening`;
      setGreetingIcon(<MoonIcon className="h-4 w-4" />)
    } else {
      greetingRef.current = `Good Night`;
      setGreetingIcon(<MoonIcon className="h-4 w-4" />)
    }
  }, []);

  return (
    <>
    
      <div className='search'>  

        <div className='.flex-column p-8' >
          <span className='flex '>{greetingRef.current}{greetingIcon}</span>
          <span className='flex '>Let's find you something tasty to make!</span>
        </div>


        {/* search bar for ingredients */}
        <div className='flex .flex-row p-0 justify-center items-center gap-2  ml-8 mr-8 '>
          <input
            type="text"
            value={searchIngredients}
            onChange={(e) => setSearchIngredients(e.target.value)}
            placeholder="Enter ingredients"
            className="h-10 w-full  border-2 border-black rounded-3xl p-4 bg-slate-50 shadow-sm"
          /> 
          <MagnifyingGlassIcon className="h-5 " onClick={handleSearch}/>
        </div>
      

        {/* fetch and map through recipe data */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className='pt-8 p-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {recipesData.map((recipe, recipeIndex) => (
              <div 
                key={recipe.recipe.uri} 
                className='flex flex-col border-2 border-black p-3 rounded-2xl mt-10 bg-slate-50'>
                <img 
                  src={recipe.recipe.image} 
                  alt={recipe.recipe.label} 
                  className='border-2 border-black rounded-2xl relative top-10 transform -translate-y-20 bg-slate-50   '/>
                
                <div className='flex flex-col flex-grow'>
                  <p className='text-xs font-normal relative top-0 transform -translate-y-5'>{recipe.recipe.source}</p>
                  <p className='text-s font-bold '>{recipe.recipe.label}</p>
                  {/* <h2>serves: {recipe.recipe.yield}</h2> */}

                  {/* <h4>Ingredients:</h4> */}
                  <ul>
                    {/* {recipe.recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient.text}</li>
                    ))} */}
                    {recipe.recipe.totalTime === 0 ? (null) 
                      : 
                    (<p className='text-xs flex items-center gap-1 justify-center p-1'><ClockIcon className='h-5 w-5'/>{recipe.recipe.totalTime}min </p>)}
                    
                  </ul>
                </div>

                <div className='flex items-center justify-center gap-1'>
                  <button
                    onClick={() => toggleRecipeOverlay(recipeIndex)}
                    className='border-2 border-black rounded-2xl p-2 text-xs mt-0 bg-slate-200 cursor-pointer '
                  >View Recipe</button>
                  <HeartIcon className='h-5 w-5'/>
                </div>
                {/* <button 
                  onClick={() => getRecipeInstructions(recipe.recipe.url)}
                  className='border-2 border-black rounded-2xl p-2 mt-2 bg-slate-50'
                >Get Instructions</button> */}
              </div>
            ))}
          </div>

        )}

      {/* conditionally render 'load more' button if search results are greater than 10 */}
      { recipesData.length >= 4 ? (
          <button onClick={loadMore}
          className='border-2 border-black rounded-xl p-2 text-s m-2 bg-slate-200 cursor-pointer '
          >Load More</button>
        ) : <></>}
      
      </div>

      {/* overlay for selected recipe */}
      {selectedRecipeIndex === recipeIndex && (
        <div className='recipe-overlay'>
            <h2>{selectedRecipeIndex.recipe.label}</h2>
           <h4>Ingredients:</h4> 
           <ul>
            {recipe.recipe.ingredients.map((ingredient, recipeIndex) => (
              <li key={recipeIndex}>{ingredient.text}</li>
            ))} 
            </ul>
        </div>
      )}

    </>
  )
}
