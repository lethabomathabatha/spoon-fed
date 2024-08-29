import { useState, useEffect } from 'react';
import { ClockIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { ArrowDownLeftIcon } from '@heroicons/react/24/outline';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import '../App.css';

// custom type definition for recipe data
type Recipe = {
  key: string;
  recipe: {
    uri: string;
    label: string;
    image: string;
    ingredients: { text: string }[];
    url: string;
    thumbnailImages: string[];
    totalTime: number;
    source: string;
    yield: number;
    cuisineType: string;
  };
};

export default function Recommendations() {
  const [loading, setLoading] = useState(false);
  const [randomRecipesData, setRandomRecipesData] = useState<Recipe[]>([]);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState<number | null>(null); // Handle recipe overlay
  const [isOverlayOpen, setIsOverlayOpen] = useState(false); // Overlay state
  const [isBackgroundDimmed, setIsBackgroundDimmed] = useState(false); // Dimming background state

  const apiId = import.meta.env.VITE_API_ID;
  const apiKey = import.meta.env.VITE_API_KEY;

  // Function to load random recipes
  function loadRandomRecipes() {
    setLoading(true);
    fetch(
      `https://api.edamam.com/search?q=random&app_id=${apiId}&app_key=${apiKey}&from=0&to=10`
    )
      .then((res) => res.json())
      .then((data) => {
        // Randomize results
        const randomRecipes = data.hits.sort(() => Math.random() - 0.5);
        setRandomRecipesData(randomRecipes);
        setLoading(false);
      })
      .catch((error) => {
        console.log('Fetch Error:', error);
        setLoading(false);
      });
  }

  useEffect(() => {
    loadRandomRecipes();
  }, []);

  // Display selected recipe's overlay
  function openRecipeOverlay(recipeIndex: number | null) {
    setSelectedRecipeIndex(recipeIndex);
    setIsOverlayOpen(true);
    setIsBackgroundDimmed(true);
  }

  // get full recipe instructions from recipe source website
  const getRecipeInstructions = (url: string) => {
    window.open(url, '_blank')
  }

  // Close the overlay
  function closeRecipeOverlay() {
    setSelectedRecipeIndex(null);
    setIsOverlayOpen(false);
    setIsBackgroundDimmed(false);
  }

  return (
    <div className=''>
      <p className='lg:text-2xl'>Want to try something new?</p>
      {loading ? (
        <div className='lg:text-xl'>Loading...</div>
      ) : (
        <div className='flex flex-col lg:flex-row md:flex-row gap-2 lg:gap-10 md:gap-10 p-8 lg:p-4 md:p-4 overflow-hidden flex-grow  overflow-x-visible'>
          {randomRecipesData.map((recipe, index) => ( // Add index parameter here
            <div
              key={recipe.recipe.uri}
              className='flex flex-col p-3 custom-shadow rounded-2xl mt-20 bg-slate-50 flex-grow border-2 border-black'
            >
              <img
                src={recipe.recipe.image}
                alt={recipe.recipe.label}
                className='custom-shadow border-2 border-black rounded-2xl relative top-5 mx-auto object-cover w-3/4 transform -translate-y-20 bg-slate-50'
              />
              <div className='flex flex-col flex-grow'>
                <p className='text-xs lg:text-lg font-normal relative top-0 transform -translate-y-5 text-center capitalize'>
                  {recipe.recipe.source}
                </p>
                <p className='text-xs lg:text-lg font-bold text-center capitalize'>
                  {recipe.recipe.label}
                </p>
                <ul>
                  {recipe.recipe.totalTime === 0 ? null : (
                    <p className='text-xs flex items-center gap-1 justify-center p-1'>
                      <ClockIcon className='h-5 w-5' /> {recipe.recipe.totalTime}min
                    </p>
                  )}
                </ul>
              </div>
              <div className='flex items-center justify-center mt-2'>
                <button
                  onClick={() => openRecipeOverlay(index)} // Correctly pass the index
                  className='border-2 border-black rounded-2xl p-1 text-xs lg:text-lg mt-0 lg:m-3 bg-slate-200 cursor-pointer hover:bg-black hover:text-white'
                >
                  View Recipe
                </button>
                <HeartIcon className='h-5 w-5 ml-2 lg:w-8 lg:h-8' />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dimming background when overlay is active */}
      {isBackgroundDimmed && <div className='bg-black opacity-50 fixed inset-0 w-full'></div>}

      {/* Recipe overlay */}
      {isOverlayOpen && selectedRecipeIndex !== null && (
        <div className='absolute border-2 border-black p-0 rounded-2xl top-20 left-1/2 transform -translate-x-1/2 max-w-md w-4/5 translate-y-50 bg-white'>
          {/* Recipe content */}
          <div className='relative'>
            <img
              src={randomRecipesData[selectedRecipeIndex]?.recipe.image}
              alt={randomRecipesData[selectedRecipeIndex]?.recipe.label}
              className='rounded-t-xl w-full'
            />
            <ArrowDownLeftIcon 
              onClick={closeRecipeOverlay} 
              className='top-0 right-0 absolute translate-y-2 -translate-x-2 bg-black text-white w-8 border-2 border-black rounded-md p-1 '
            />         
          </div>
          <h2 className='flex flex-row justify-center gap-3 text-lg font-semibold rounded-xl bg-white shadow-md p-2 mb-2'>
            {randomRecipesData[selectedRecipeIndex]?.recipe.label}{' '}
            <HeartIcon className='w-6' />
          </h2>
          <h2 className='flex justify-center text-md font-semibold gap-1'><UserGroupIcon className='w-6'/> {randomRecipesData[selectedRecipeIndex]?.recipe.yield}</h2>
          <h2 className='text-lg font-semibold text-center'>Ingredients</h2>
          {randomRecipesData[selectedRecipeIndex]?.recipe.ingredients.map((ingredient, index) => (
            <li key={index} className='text-center pl-3 pr-3'>{ingredient.text}</li>
          ))}

          <button 
            onClick={() => getRecipeInstructions(randomRecipesData[selectedRecipeIndex]?.recipe.url)}
            className=' border-2 border-black rounded-2xl p-2 m-4 bg-slate-50 cursor-pointer '
            >Get Instructions</button>         
        </div>     
      )}
    </div>
  );
}
