import React from 'react'

const Recipes = (props) => {
    const recipesData = props.recipesData

    let recipes = recipesData ? recipesData.map(recipe => {
        const image = recipe.recipe_photo ? <img src={recipe.recipe_photo} alt="Sample"/>  : null
        return(
            // <div key={recipe.id} onClick={() => props.handleClickedRecipe(recipe.id)}>
            //     <h3 >{recipe.recipe_title}</h3>
            // </div>
            <article className="card" key={recipe.id} onClick={() => props.handleClickedRecipe(recipe.id)}>
                {image}
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