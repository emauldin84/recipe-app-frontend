import React from 'react'
import { EditorState, Editor, convertFromRaw } from 'draft-js'


import BackButton from '../utils/BackButton'

const Recipe = (props) => {
    const recipeData = props.selectedRecipe
    console.log('RD',recipeData)

    let recipe = recipeData ? recipeData.map(recipe => {
        console.log(recipe.recipe_details)
        return(
            <div key={recipe.id}>
                
                <div>
                    <h3 >{recipe.recipe_title}</h3>
                    <p>{recipe.recipe_added_date}</p>
                    <div className='recipeDetails'>
                        <Editor 
                        editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(recipe.recipe_details)))}
                        readOnly={true}
                    />
                    </div>
                </div>

            </div>
        )
    }) : null

    if(recipeData === null){
        props.history.push('/')
    }

    return(
        <div className='recipeContainer'>
            <BackButton handleClickedBackButton={props.handleClickedBackButton}/>
            {recipe}
        </div>
    )
}

export default Recipe