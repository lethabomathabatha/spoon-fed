import React from "react";
import HomeStyles from "./HomeStyles.css"

export default function RecommendedPicks() {

    const [recommended, setRecommended] = React.useState([]);
    
    const appId = '9b922e44';
    const appKey = '73488167b099164fd2f8e014ec845b66';
    

    React.useEffect(function() {fetch(
        `https://api.edamam.com/search?q=Popular&app_id=${appId}&app_key=${appKey}`)
        .then(res => res.json())
        .then(recipe => setRecommended(recipe.hits))
    }, [])

    console.log(recommended)
    
  

    return (
        <div className="recommended">
            <h4>Try some of our most popular recipes</h4>
            {recommended.map((recipe) => {
                return (
                    <div key={recipe.recipe.url} className="recommended--card">
                        <h4 className="recommended--card-label">{recipe.recipe.label}</h4>
                        <img src={recipe.recipe.image} className="recommended--card-image" alt="recipe-image"/>
                    </div>
                );
            })}
        </div>
    )
    
}