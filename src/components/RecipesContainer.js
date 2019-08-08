import React from 'react'

import Recipes from './Recipes'

const RecipesContainer = (props) => {
    return(
        <div>
            <Recipes recipesData={props.recipes}/>
        </div>
    )
}

export default RecipesContainer