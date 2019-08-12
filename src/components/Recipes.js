import React from 'react'

const Recipes = (props) => {
    const recipesData = props.recipesData

    let recipes = recipesData ? recipesData.map(recipe => {
        return(
            <div className={'recipeContainer'} key={recipe.id} onClick={() => props.handleClickedRecipe(recipe.id)}>
                <h3 >{recipe.recipe_title}</h3>
            </div>
        )
    }) : null

    return(
        <div>
            {recipes}
        </div>
    )
}

export default Recipes