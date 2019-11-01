import React from 'react'


const Recipes = (props) => {

    const recipesData = props.recipes

    let filteredRecipes = recipesData ? recipesData.filter(recipe => {
        return recipe.recipe_title.toLowerCase().includes(props.search.toLowerCase())
    }) : null

    let recipes = recipesData ? props.search ? filteredRecipes.map(recipe => {
        const image = recipe.recipe_photo ? <img src={recipe.recipe_photo} alt={recipe.recipe_title}/>  : null
        return(
            <article className="card" key={recipe.id} onClick={() => props.handleClickedRecipe(recipe.id)}>
                {image}
                <div className="recipeTitle">
                    <h3>{recipe.recipe_title}</h3>
                </div>
            </article>
        )
    })
    :
    recipesData.map(recipe => {
        const image = recipe.recipe_photo ? <img src={recipe.recipe_photo} alt="Sample"/>  : null
        return(
            <article className="card" key={recipe.id} onClick={() => props.handleClickedRecipe(recipe.id)}>
                {image}
                <div className="recipeTitle">
                    <h3>{recipe.recipe_title}</h3>
                </div>
            </article>
        )
    }) : null

    return(
        <div>
            <div className='cards'>
                {recipes}
            </div>

        </div>

        
    )
}

export default Recipes