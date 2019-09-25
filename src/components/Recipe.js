import React, { Component } from 'react'
import { EditorState, Editor, convertFromRaw } from 'draft-js'
import moment from 'moment'

import InRecipeTextEditor from '../utils/InRecipeTextEditor'
import BackButton from '../utils/BackButton'


class Recipe extends Component {
    state = {
        editing: false
    }

    onEditHandler = () => {
        this.setState({
            editing: !this.state.editing,
        })
    }

    onSaveHandler = (e) => {
        e.preventDefault()

        // BUILD THIS OUT
    }

    render() {
        console.log('editedDetails',this.props.editedDetails)
        const recipeData = this.props.selectedRecipe
        console.log('RD',recipeData)

        
        let recipe = recipeData ? recipeData.map(recipe => {
            const details = this.state.editing ? <InRecipeTextEditor 
                                                    onTextEditorChangeHandlerEdit={this.props.onTextEditorChangeHandlerEdit}
                                                    editedDetails={EditorState.createWithContent(convertFromRaw(JSON.parse(recipe.recipe_details)))}
                                                /> 
                                                : <Editor 
                                                    editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(recipe.recipe_details)))}
                                                    readOnly={true}
                                                />
            const image = recipe.recipe_photo ? <img className='recipeImage'src={recipe.recipe_photo} alt="Sample"/>  : null
            console.log('RECIPE DETAILS', recipe.recipe_details)
            return(
                <div key={recipe.id}>
                    
                    <div>
                        <button class='editButton' onClick={this.onEditHandler}>{this.state.editing ? 'Discard Changes' : 'Edit'}</button>
                        <button class='saveButton' style={this.state.editing ? null : { display: 'none' }} onClick={this.onSaveHandler}>Save Changes</button>
                        <h3>{recipe.recipe_title}</h3>
                        <p className='recipeAddedDate'><b>Recipe added:</b> {moment(recipe.recipe_added_date).format('LL')}</p>
                        {image}
                        <div className='recipeDetails'>
                        {/* <Editor 
                        editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(recipe.recipe_details)))}
                        readOnly={true}
                        /> */}
                        {details}
                        </div>
                    </div>
    
                </div>
            )
        }) : null
    
        if(recipeData === null){
            this.props.history.push('/')
        }
    
        return(
            <div className='recipeContainer'>
                <BackButton handleClickedBackButton={this.props.handleClickedBackButton}/>
                {recipe}
            </div>
        )

    }
}

export default Recipe