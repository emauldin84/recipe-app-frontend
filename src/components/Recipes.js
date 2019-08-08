import React from 'react'

const Recipes = (props) => {
    const recipesData = props.recipesData

    let recipes = recipesData ? recipesData.map(recipe => {
        return(
            <p key={recipe.id}>{recipe.recipe_title}</p>

        )
    }) : null

    return(
        <div>
            {recipes}
        </div>
    )
}

export default Recipes