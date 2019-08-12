import React from 'react'

const Recipe = (props) => {
    const recipeData = props.selectedRecipe

    let recipe = recipeData ? recipeData.map(recipe => {
        return(
            <div key={recipe.id}>
                <h3 >{recipe.recipe_title}</h3>
                <p>{recipe.recipe_added_date}</p>
                <p>{recipe.recipe_details}</p>
            </div>
        )
    }) : null

    return(
        <div>
            {recipe}
        </div>
    )
}

export default Recipe