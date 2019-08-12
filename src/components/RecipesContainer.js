import React from 'react'

import Recipes from './Recipes'

const RecipesContainer = (props) => {
    return(
        <div>
            <Recipes 
                recipesData={props.recipes}
                handleClickedRecipe={props.handleClickedRecipe}/>
        </div>
    )
}

export default RecipesContainer