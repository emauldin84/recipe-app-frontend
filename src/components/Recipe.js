import React, { Component } from 'react'
import { EditorState, Editor, convertFromRaw } from 'draft-js'
import moment from 'moment'
import axios from 'axios'
import { FaEdit, FaSave, FaTrash, FaUndo } from 'react-icons/fa'

import InRecipeTextEditor from '../utils/InRecipeTextEditor'
import BackButton from '../utils/BackButton'



class Recipe extends Component {
    state = {
        editing: false,
        title: null,
        detailsForUpload: null,
        image: null,
        imageUrl: null,
    }

    onEditHandler = () => {
        this.setState({
            editing: !this.state.editing
        })
    }

    deleteHandler = async () => {
        let confirmation = window.confirm('Are you sure you would like to delete this recipe? This cannot be undone.')
        if (confirmation) {
            await axios.delete(`/recipes/delete-recipe/${this.props.selectedRecipe[0].id}`)
            .then(res => {
                console.log('successfully delete', res.data)
                this.props.history.push(`/`)
                }
            )
        }
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
            title: this.state.title !== null ? this.state.title : this.props.selectedRecipe[0].recipe_title,
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
        this.setState({
            title: e.target.value,
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
        // console.log('RD',recipeData)

        
        let recipe = recipeData ? recipeData.map(recipe => {
            const details = this.state.editing ? <InRecipeTextEditor 
                                                    onTextEditorChangeHandlerEdit={this.props.onTextEditorChangeHandlerEdit}
                                                    editedDetails={EditorState.createWithContent(convertFromRaw(JSON.parse(recipe.recipe_details)))}
                                                /> 
                                                : <Editor 
                                                    editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(recipe.recipe_details)))}
                                                    readOnly={true}
                                                />
            // const image = recipe.recipe_photo || !recipe.recipe_photo ? this.state.editing ? <input id='imageUrl' defaultValue={recipe.recipe_photo} className='Input imageUrlInput' onChange={this.onImageUrlChangeHandler}/> : <img className='recipeImage'src={recipe.recipe_photo} alt="Sample"/>  : recipe.recipe_photo ? <img className='recipeImage'src={recipe.recipe_photo} alt="Sample"/> : null

            const title = this.state.editing ? <input id='title' defaultValue={recipe.recipe_title} placeholder='What is the title of your dish?' className='Input' onChange={this.onTitleChangeHandler} type="text" required/> : <h3>{recipe.recipe_title}</h3>
                        
            let image = null
            if (recipe.recipe_photo || !recipe.recipe_photo) {
                if (this.state.editing) {
                    image = <input id='imageUrl' placeholder='Enter image URL' defaultValue={recipe.recipe_photo} className='Input imageUrlInput' onChange={this.onImageUrlChangeHandler}/>
                } else {
                    if(recipe.recipe_photo) {
                        image = <img className='recipeImage'src={recipe.recipe_photo} alt="Sample"/>
                    } else {
                        image = null
                    }
                }
            }
            let date = this.state.editing ? null : <p className='recipeAddedDate'><b>Recipe added:</b> {moment(recipe.recipe_added_date).format('LL')}</p>

            let editDiscard = this.state.editing ? <FaUndo className='editButton' title='Undo' onClick={this.onEditHandler}/> : <FaEdit className='editButton' title='Edit' onClick={this.onEditHandler}/>

            // console.log('RECIPE DETAILS', recipe.recipe_details)
            return(
                <div key={recipe.id}>
                    
                    <div>
                        <div className='button-container'>
                            {/* <FaEdit className='editButton' title='Edit' onClick={this.onEditHandler}>{this.state.editing ? 'Discard Changes' : 'Edit'}</FaEdit> */}
                            {/* <FaEdit className='editButton' title='Edit' onClick={this.onEditHandler}/> */}
                            {editDiscard}
                            {/* <img src={require('../media/iconfinder_save_326688.png')} className='editButton' onClick={this.onEditHandler} /> */}
                            <FaTrash className='deleteButton' title='Delete' onClick={this.deleteHandler} style={!this.state.editing ? null : null}>Delete</FaTrash>
                        </div>
                        <form action={`/recipes/edit/${this.props.selectedRecipe[0].id}`} className='editRecipeForm' encType="multipart/form-data" method="post" onSubmit={this.onSaveHandler}>
                            <div className='saveButtonContainer'>
                                <FaSave className='saveButton' title='Save changes' style={this.state.editing ? null : { display: 'none' }}>Save Changes</FaSave>
                            </div>
                            {title}
                            {date}
                            {image}
                            <div className='recipeDetails'>
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
            <div>
                <BackButton handleClickedBackButton={this.props.handleClickedBackButton}/>

            <div className='recipeContainer'>
                {recipe}
            </div>
            </div>
        )

    }
}

export default Recipe