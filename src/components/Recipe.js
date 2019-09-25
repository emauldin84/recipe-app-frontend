import React, { Component } from 'react'
import { EditorState, Editor, convertFromRaw } from 'draft-js'
import moment from 'moment'
import axios from 'axios'

import InRecipeTextEditor from '../utils/InRecipeTextEditor'
import BackButton from '../utils/BackButton'


class Recipe extends Component {
    state = {
        editing: false,
        title: null,
        detailsForUpload: this.props.editedDetails,
        image: null,
        imageUrl: null,
    }

    onEditHandler = () => {
        this.setState({
            editing: !this.state.editing
        })
    }

    onSaveHandler = (e) => {
        e.preventDefault()

        // FINISH BUILDING THIS OUT

        const formData = {
            title: this.state.title,
            details: this.state.detailsForUpload,
            photo: this.state.image ? `public/uploads/IMAGE-${Date.now()}-${this.state.image.name}` : this.state.imageUrl ? this.state.imageUrl : null,
        }
        console.log('formData', formData)

        axios.post(`/recipes/edit/${this.props.selectedRecipe.id}`, formData)
        .then(res => {
            console.log(res.data)
            console.log('The file was successfully uploaded')
            
            this.setState({
                editing: false,
            })

        })
        .catch(err => err)
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
                        <form action={`/recipes/edit/${this.props.selectedRecipe.id}`} className='editRecipeForm' encType="multipart/form-data" method="post" onSubmit={this.onSaveHandler}>

                            <button class='editButton' onClick={this.onEditHandler}>{this.state.editing ? 'Discard Changes' : 'Edit'}</button>
                            <button class='saveButton' style={this.state.editing ? null : { display: 'none' }}>Save Changes</button>
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
                        </form>
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