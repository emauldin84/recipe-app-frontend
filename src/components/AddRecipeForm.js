import React, {Component} from 'react'
import axios from 'axios'
import moment from 'moment'
import { FaSave } from 'react-icons/fa'



import BackButton from '../utils/BackButton'
// import PhotoUploader from '../utils/PhotoUploader'
import TextEditor from '../utils/TextEditor'

class AddRecipeForm extends Component {
    state = {
        newRecipe: {
            title: '',
            date: null,
            details: '',
            user_id: null,
        },
        image: null,
        imageUrl: null,
        detailsForUpload: null,
        formValidated: true,
    }

    onTitleChangeHandler = (e) => {
        this.setState({
            newRecipe: {
                ...this.state.newRecipe,
                title: e.target.value,
            }
        }, // console.log(this.state.newRecipe)
        )}
    onImageUrlChangeHandler = (e) => {
        this.setState({
            imageUrl: e.target.value,
            })
    }
    onTextEditorChangeHandler = (uploadDetails) => {
    // onTextEditorChangeHandler = (state, uploadDetails) => {
        this.setState({
            // newRecipe: {
            //     ...this.state.newRecipe,
            //     details: state,
            // },
            detailsForUpload: uploadDetails
        })
    }

    // onImageChangeHandler = (e) => {
    //     console.log(e.target.files[0])
    //     this.setState({
    //             image: e.target.files[0],
    //     })
    // }

    onSubmitHandler = (e) => {
        e.preventDefault()

        // const photoData = new FormData()
        // const file = this.state.image ? this.state.image.name : null
        // photoData.append("file", file)
        // axios.post('/recipes/photo-uploader', photoData, {
        //     headers: { 
        //         'Content-Type': 'multipart/form-data',
        //     }
        // })
        // .then(res => {
        //     console.log('response from file upload',res)
        // })
        // .catch(err => err)

        const formData = {
            title: this.state.newRecipe.title,
            date: moment().format('l'),
            details: this.state.detailsForUpload,
            photo: this.state.image ? `public/uploads/IMAGE-${Date.now()}-${this.state.image.name}` : this.state.imageUrl ? this.state.imageUrl : null,
            // retrieve user_id from JWT?
            user_id: this.props.userId,
        }
        // console.log('formData', formData)

        axios.post('/recipes/add-new-recipe', formData)
        .then(res => {
            // console.log('This file was successfully uploaded', res.data)

            this.props.history.push('/')
        })
        .catch(err => err)
    }


    render() {
        // console.log('DETAILS FOR UPLOAD', this.state.detailsForUpload)
        return (
            <div>
                <BackButton handleClickedBackButton={this.props.handleClickedBackButton}/>
                <div className='recipeFormContainer'>
                    <form action='/recipes/add-new-recipe' className='form' encType="multipart/form-data" method="post" onSubmit={this.onSubmitHandler}>
                        <div>
                            <label className='recipeTitleInput Label'>Title</label>
                            <input id='title' value={this.state.newRecipe.title} placeholder='What is the title of your dish?' className='Input' onChange={this.onTitleChangeHandler} type="text" required/>
                        </div>

                        <div>
                            <label className='recipeDetailsInput Label'>Recipe</label>
                            {/* <textarea id='details' value={this.state.newRecipe.details} className='Input' placeholder='Enter ingredients, timing and recipe steps...' onChange={this.onChangeHandler} rows='10'/> */}
                            <TextEditor onTextEditorChangeHandler={this.onTextEditorChangeHandler} formValidated={this.state.formValidated}/>
                        </div>
                        <div>
                            {/* <label className='recipeTitleInput Label'>Title</label> */}
                            <label htmlFor='url' className='recipeTitleInput Label'>Image</label>
                            <input id='imageUrl' type='url' name='url' value={this.state.newRecipe.imageUrl} placeholder='Enter image URL' className='Input imageUrlFieldInput' onChange={this.onImageUrlChangeHandler}/>
                        </div>
                        {/* <PhotoUploader handleImageSelect={this.onImageChangeHandler} image={this.state.image}/> */}
                        {/* <button type='submit' className='submitButton'>Save</button> */}
                        <button type='submit' className='submitButton submitRecipe saveButtonInnerContainer' title='Save Recipe'><FaSave className='saveButton'/></button>


                    </form>
                </div>


            </div>
        )

    }
}

export default AddRecipeForm