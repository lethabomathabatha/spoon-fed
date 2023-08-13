import { useState, useEffect } from 'react'
import { ClockIcon } from '@heroicons/react/24/solid'
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

export default function Recommendations() {

  const [loading, setLoading] = useState(false)
  const [randomRecipesData, setRandomRecipesData] = useState<Recipe[]>([])
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState<number | null>(null);

  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [isBackgroundDimmed, setIsBackgroundDimmed] = useState(false)

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

  // display selected recipe's overlay
  function openRecipeOverlay(recipeIndex: number | null) {
    setSelectedRecipeIndex(recipeIndex);
    setIsOverlayOpen(true)
    setIsBackgroundDimmed(true)
  }



  // get full recipe instructions from recipe source website
  const getRecipeInstructions = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <>
      {/* recipe caurosel recommendations */}
      <div className='random-results'>
        <p>Want to try something new?</p>
          <div className='pt-8 p-5 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            { loading ? (
              <div>Loading...</div>
            ) : (
                <div className=''>
                
                  {randomRecipesData.map((recipe) => (
                  <div key={recipe.recipe.uri} className='flex flex-col border-2 border-black p-3 rounded-2xl mt-10 bg-slate-50 '>
                      <img 
                        src={recipe.recipe.image} 
                        alt={recipe.recipe.label} 
                        className='border-2 border-black rounded-xl relative top-10 transform -translate-y-20 bg-slate-50'
                      />
                      <div className='flex flex-col flex-grow '>
                        <p className='text-xs font-normal relative top-0 transform -translate-y-5 text-center capitalize'>{recipe.recipe.source}</p>
                        <p className='text-s font-bold text-center capitalize'>{recipe.recipe.label}</p>
            
                        <ul>
                          {recipe.recipe.totalTime === 0 ? (null) 
                            : 
                          (<p className='text-xs flex items-center gap-1 justify-center p-1'><ClockIcon className='h-5 w-5'/>{recipe.recipe.totalTime}min </p>)}
                        </ul>
                      </div>
                      
                  <div className='flex items-center justify-center gap-1'>
                    <button
                      // onClick={() => openRecipeOverlay(index)}
                      className='border-2 border-black rounded-2xl p-2 text-xs mt-0 bg-slate-200 cursor-pointer '
                    > View Recipe</button>
                    <HeartIcon className='h-5 w-5'/>
                  </div>    
                  
                  
                  </div>
                  ))}
                </div>
            )}
            
          </div>
          
      </div>
    </>
  )
}
