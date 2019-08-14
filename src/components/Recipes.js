import React from 'react'

const Recipes = (props) => {
    const recipesData = props.recipesData

    let recipes = recipesData ? recipesData.map(recipe => {
        return(
            // <div key={recipe.id} onClick={() => props.handleClickedRecipe(recipe.id)}>
            //     <h3 >{recipe.recipe_title}</h3>
            // </div>
            <article className="card" key={recipe.id} onClick={() => props.handleClickedRecipe(recipe.id)}>
                <img src={recipe.recipe_photo ? recipe.recipe_photo : null} alt="Sample"/>
                <div className="recipeTitle">
                    <h3>{recipe.recipe_title}</h3>
                </div>
            </article>
        )
    }) : null

    return(
        <div className='cards'>
            {recipes}
        </div>

        
    )
}

export default Recipes