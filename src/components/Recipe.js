import React, { Component } from 'react'
import { EditorState, Editor, convertFromRaw } from 'draft-js'
import moment from 'moment'
import axios from 'axios'

import InRecipeTextEditor from '../utils/InRecipeTextEditor'
import BackButton from '../utils/BackButton'


class Recipe extends Component {
    state = {
        editing: false,
        title: 'THIS HAS BEEN EDITED',
        detailsForUpload: null,
        image: null,
        imageUrl: null,
    }

    onEditHandler = () => {
        this.setState({
            editing: !this.state.editing
        })
    }

    setStateDetailsForUpload = () => {
        this.setState({
            detailsForUpload: this.props.editedDetails,
        })
    }

    // onTextEditorChangeHandler = (uploadDetails) => {
    //         this.setState({
    //             detailsForUpload: uploadDetails
    //         })
    //     }

    onSaveHandler = async (e) => {
        e.preventDefault()
        await this.setStateDetailsForUpload()
        console.log('STATE DETAILS FOR UPLOAD',this.state.detailsForUpload)
        console.log('EDITED DETAILS FOR UPLOAD',this.props.editedDetails)
        // FINISH BUILDING THIS OUT
        // this.state.detailsForUpload are showing 'null'

        const formData = {
            title: this.state.title,
            details: this.state.detailsForUpload !== null ? this.state.detailsForUpload : this.props.selectedRecipe[0].recipe_details,
            photo: this.state.imageUrl !== null ? this.state.imageUrl : this.props.selectedRecipe[0].recipe_photo,
        }
        console.log('formData', formData)

        await axios.post(`/recipes/edit/${this.props.selectedRecipe[0].id}`, formData)
        .then(res => {
            console.log('Response Data', res.data)
            console.log('The file was successfully uploaded')
            
            this.setState({
                editing: false,
            })
            // this.props.history.push(`/recipe/${this.props.selectedRecipe[0].id}`)
            this.props.history.push(`/`)

        })
        .catch(err => err)
    }
    // UPDATE FOR THIS COMPONENT
    onTitleChangeHandler = (e) => {
        console.log('event value', e.target.textContent)
        this.setState({
            title: e.target.textContent,
        })
    }
    onImageUrlChangeHandler = (e) => {
        this.setState({
            imageUrl: e.target.value,
            })
    }

    render() {
        // console.log('editedDetails',this.props.editedDetails)
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
            const image = recipe.recipe_photo ? this.state.editing ? <input id='imageUrl' defaultValue={recipe.recipe_photo} className='Input imageUrlInput' onChange={this.onImageUrlChangeHandler}/> : <img className='recipeImage'src={recipe.recipe_photo} alt="Sample"/>  : null
            // console.log('RECIPE DETAILS', recipe.recipe_details)
            return(
                <div key={recipe.id}>
                    
                    <div>
                            <button className='editButton' onClick={this.onEditHandler}>{this.state.editing ? 'Discard Changes' : 'Edit'}</button>
                        <form action={`/recipes/edit/${this.props.selectedRecipe[0].id}`} className='editRecipeForm' encType="multipart/form-data" method="post" onSubmit={this.onSaveHandler}>
                            <button className='saveButton' style={this.state.editing ? null : { display: 'none' }}>Save Changes</button>

                            <h3 contentEditable={this.state.editing} suppressContentEditableWarning={true} onChange={this.onTitleChangeHandler}>{recipe.recipe_title}</h3>
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