import React from "react";
import HomeStyles from "./HomeStyles.css"
import Mui from '@mui/material';


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
        <div>
            <p className="recommended--title">Try some of our most popular recipes</p>
            <div className="recommended">
                {recommended.map((recipe) => {
                    return (
                        <div key={recipe.recipe.url} className="recommended--card">
                            <img src={recipe.recipe.image} className="recommended--card-image" alt="recipe-image" />
                            <h4 className="recommended--card-label">{recipe.recipe.label}</h4>
                            <Mui.Button>Try</Mui.Button>
                        </div>
                    );
                })}
            </div>
        </div>
    )
    
}