import { useState, useEffect } from 'react'
import { ClockIcon } from '@heroicons/react/24/solid'
import { HeartIcon } from '@heroicons/react/24/outline'
import '../App.css'
// import { ChevronDownIcon } from '@heroicons/react/20/solid'
// import { ChevronUpIcon } from '@heroicons/react/24/outline'


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
  // const [selectedRecipeIndex, setSelectedRecipeIndex] = useState<number | null>(null);

  // const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  // const [isBackgroundDimmed, setIsBackgroundDimmed] = useState(false)
  // const [initialRecipeCount, setInitialRecipeCount] = useState(2)
  // const [isArrowDown, setArrowDown] = useState(true)



  const apiId = import.meta.env.VITE_API_ID
  const apiKey = import.meta.env.VITE_API_KEY

  // load 10 random results from api
  // Function to load random recipes
  function loadRandomRecipes() {
    setLoading(true)
    // setInitialRecipeCount(2);
    // setArrowDown(true)
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

  // display selected recipe's overlay
  // function openRecipeOverlay(recipeIndex: number | null) {
  //   setSelectedRecipeIndex(recipeIndex);
  //   setIsOverlayOpen(true)
  //   setIsBackgroundDimmed(true)
  // }

  // load more functionality
  // function loadMore() {
  //   setLoading(true);
  //   // setInitialRecipeCount((prevResults => prevResults + 2));
  //   // setInitialRecipeCount(initialRecipeCount + 8);
  //   // setArrowDown(false)
  //   if (isArrowDown) {
  //     setInitialRecipeCount(initialRecipeCount + 8);
  //   } else {
  //     setInitialRecipeCount(2);
  //   }

  //   setArrowDown(!isArrowDown)
  //   loadRandomRecipes();
  // }

  // function toggleArrow() {

  // }

  // get full recipe instructions from recipe source website
  // const getRecipeInstructions = (url: string) =>   {
  //   window.open(url, '_blank')
  // }

  return (
    <div className=''>
      <p className='lg:text-2xl'>Want to try something new?</p>
      {loading ? (
        <div className='lg:text-xl'>Loading...</div>
      ) : (
        <div className='flex flex-col lg:flex-row md:flex-row gap-2 lg:gap-10 md:gap-10 p-8 lg:p-4 md:p-4 overflow-hidden flex-grow  overflow-x-visible'>
          {randomRecipesData.map((recipe) => (
              <div key={recipe.recipe.uri} className='flex flex-col p-3 custom-shadow rounded-2xl mt-20 bg-slate-50 flex-grow border-2 border-black'>
              <img
                src={recipe.recipe.image}
                alt={recipe.recipe.label}
                className=' custom-shadow border-2 border-black rounded-2xl relative top-5 mx-auto object-cover w-3/4 transform -translate-y-20 bg-slate-50   '
                
              />
              <div className='flex flex-col flex-grow'>
                <p className='text-xs lg:text-lg font-normal relative top-0 transform -translate-y-5 text-center capitalize'>{recipe.recipe.source}</p>
                <p className='text-xs lg:text-lg font-bold text-center capitalize'>{recipe.recipe.label}</p>
                <ul>
                  {recipe.recipe.totalTime === 0 ? null : (
                    <p className='text-xs flex items-center gap-1 justify-center p-1'>
                      <ClockIcon className='h-5 w-5' /> {recipe.recipe.totalTime}min
                    </p>
                  )}
                </ul>
              </div>
              <div className='flex items-center justify-center mt-2'>
                <button className='border-2 border-black rounded-2xl p-1 text-xs lg:text-lg mt-0 lg:m-3 bg-slate-200 cursor-pointer hover:bg-black hover:text-white'>
                  View Recipe
                </button>
                <HeartIcon className='h-5 w-5 ml-2 lg:w-8 lg:h-8' />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
}
