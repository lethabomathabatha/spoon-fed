import { useState} from 'react'
import '../App.css'

import { HeartIcon } from '@heroicons/react/24/outline'
import { ArrowDownLeftIcon } from '@heroicons/react/24/outline'
import { UserGroupIcon } from '@heroicons/react/24/outline'

// props
type RecipeOverlayProps = {
    isOpen: boolean;
    selectedRecipeIndex: number | null;
    onClose: () => void;
    recipeData: Recipe[];
    isBackgroundDimmed: boolean;
  };
  

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

export default function RecipeOverlay(
    {
        isOpen,
        selectedRecipeIndex,
        onClose,
        recipeData,
        isBackgroundDimmed,
      }: RecipeOverlayProps){


  const [recipesData, setRecipesData] = useState<Recipe[]>([]) 
 

  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState<number | null>(null);

  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [isBackgroundDimmed, setIsBackgroundDimmed] = useState(false)




  function closeRecipeOverlay() {
    setSelectedRecipeIndex(null)
    setIsOverlayOpen(false)
    setIsBackgroundDimmed(false)
  }



  // get full recipe instructions from recipe source website
  const getRecipeInstructions = (url: string) => {
    window.open(url, '_blank')
  }


  return (
    <>
        
               
        {/* dimming background when overlay is active */}
        {isBackgroundDimmed && <div className='bg-black opacity-50 fixed inset-0 w-full ' ></div>}
       
       {/* overlay */}
      {isOverlayOpen && selectedRecipeIndex !== null && (
        <div className='absolute border-2 border-black p-0 custom-shadow rounded-2xl top-20 left-1/2 transform -translate-x-1/2  max-w-md w-4/5 translate-y-50 bg-white ' >
          <div className='relative'>
            <img 
              src={recipesData[selectedRecipeIndex]?.recipe.image} 
              alt={recipesData[selectedRecipeIndex]?.recipe.label} 
              className=' rounded-t-xl w-full '
            />
            <ArrowDownLeftIcon onClick={closeRecipeOverlay} className='top-0 right-0 absolute translate-y-2 -translate-x-2 bg-black text-white w-8 border-2 border-black rounded-md p-1 '/>
            {/* <HeartIcon className=' w-10 fill-white top-1/2 right-0 absolute translate-y-50 -translate-x-0 border-black rounded-md p-1 '/> */}
          </div>
          <h2 className='flex flex-row justify-center gap-3 text-lg font-semibold rounded-xl bg-white shadow-md p-2 mb-2 '>{recipesData[selectedRecipeIndex]?.recipe.label} <HeartIcon className='w-6' /> </h2>
          <h2 className='flex justify-center text-md font-semibold gap-1'><UserGroupIcon className='w-6'/> {recipesData[selectedRecipeIndex]?.recipe.yield}</h2>
          <h2 className='text-lg font-semibold text-center'>Instructions</h2>
          {recipesData[selectedRecipeIndex]?.recipe.ingredients.map((ingredient, index) => (
            <li key={index} className='text-center pl-3 pr-3'>{ingredient.text}</li>
          ))}
          
          <button 
            onClick={() => getRecipeInstructions(recipesData[selectedRecipeIndex]?.recipe.url)}
            className=' border-2 border-black rounded-2xl p-2 m-4 bg-slate-50 cursor-pointer '
            >Get Instructions</button>
         {/* recipe instructions: */}

          {/* {recipesData[selectedRecipeIndex]?.recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.text}</li>
          ))}*/}
         
         
        </div>
      )}


    </>
  )
}
