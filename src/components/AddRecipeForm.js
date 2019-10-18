import React, {Component} from 'react'
import axios from 'axios'
import moment from 'moment'


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
        detailsForUpload: null
    }

    onTitleChangeHandler = (e) => {
        this.setState({
            newRecipe: {
                ...this.state.newRecipe,
                title: e.target.value,
            }
        }, console.log(this.state.newRecipe))
    }
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

    onSubmitHandler = (e) => {
        e.preventDefault()

        // const photoData = new FormData()
        // const file = this.state.image ? this.state.image.name : null
        // photoData.append("photo", file)
        // axios.post({
        //     method: 'post',
        //     url: '/recipes/upload-image',
        //     data: photoData,
        //     config: { headers: { 'Content-Type': 'multipart/form-data' } }
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
            user_id: this.props.user.id,
        }
        console.log('formData', formData)

        axios.post('/recipes/add-new-recipe', formData)
        .then(res => {
            console.log(res.data)
            console.log('The file was successfully uploaded')
            
            this.props.history.push('/')

        })
        .catch(err => err)
    }

    // onImageChangeHandler = (e) => {
    //     console.log(e.target.files[0])
    //     this.setState({
    //             image: e.target.files[0],
    //     })
    // }

    render() {
        console.log('DETAILS FOR UPLOAD', this.state.detailsForUpload)
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
                            <TextEditor onTextEditorChangeHandler={this.onTextEditorChangeHandler}/>
                        </div>
                        <div>
                            {/* <label className='recipeTitleInput Label'>Title</label> */}
                            <label className='recipeTitleInput Label'>Image</label>
                            <input id='imageUrl' value={this.state.newRecipe.imageUrl} placeholder='Enter image URL' className='Input imageUrlInput' onChange={this.onImageUrlChangeHandler}/>
                        </div>
                        {/* <PhotoUploader handleImageSelect={this.onImageChangeHandler} image={this.state.image}/> */}
                        <button type='submit' className='submitButton'>Save</button>

                    </form>
                </div>


            </div>
        )

    }
}

export default AddRecipeForm