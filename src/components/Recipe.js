import React from 'react'

import BackButton from '../utils/BackButton'

const Recipe = (props) => {
    const recipeData = props.selectedRecipe
    console.log('RD',recipeData)

    let recipe = recipeData ? recipeData.map(recipe => {
        return(
            <div key={recipe.id}>
                
                <div>
                    <h3 >{recipe.recipe_title}</h3>
                    <p>{recipe.recipe_added_date}</p>
                    <p>{recipe.recipe_details}</p>
                </div>

            </div>
        )
    }) : null

    return(
        <div className='recipeContainer'>
            <BackButton handleClickedBackButton={props.handleClickedBackButton}/>
            {recipe}
        </div>
    )
}

export default Recipe