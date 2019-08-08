import React from 'react'

const Recipes = (props) => {
    const recipesData = props.recipesData

    let recipes = recipesData ? recipesData.map(recipe => {
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
            {recipes}
        </div>
    )
}

export default Recipes