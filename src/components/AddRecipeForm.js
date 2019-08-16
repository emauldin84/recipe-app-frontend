import React, {Component} from 'react'
import axios from 'axios'
import moment from 'moment'

import BackButton from '../utils/BackButton'
import PhotoUploader from '../utils/PhotoUploader'
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
    onTextEditorChangeHandler = (state, uploadDetails) => {
        this.setState({
            newRecipe: {
                ...this.state.newRecipe,
                details: state,
            },
            detailsForUpload: uploadDetails
        }, console.log('detailsForUpload: ',this.state.detailsForUpload))
    }

    onSubmitHandler = (e) => {
        e.preventDefault()

        const formData = {
            title: this.state.newRecipe.title,
            date: moment().format('l'),
            details: this.state.detailsforUpload,
            user_id: 3,
        }
        console.log(this.state.detailsforUpload)
        console.log(formData)
        axios.post('/recipes/add-new-recipe', formData)
        // if(this.state.image) {
            // const formData = new FormData()
            // formData.append('myImage', this.state.image)
            // const config = {
            //     headers: {
            //         'content-type': 'multipart/form-data'
            //     }
            // }
            // await axios.post('/recipes/upload', formData, config)
            // .then((response) => {
            //     console.log('The file was successfully uploaded')
            // })
            // .catch(err => err)

        // }
        .then(() => {
            this.props.history.push('/')
        })
        .catch(err => err)
    }

    onImageChangeHandler = (e) => {
        let image = e.target.files[0].name
        console.log(e.target.files[0])
        this.setState({
            newRecipe: {
                ...this.state.newRecipe,
                image,
            }
        })
    }

    render() {
        return (
            <div className='recipeFormContainer'>
                <BackButton handleClickedBackButton={this.props.handleClickedBackButton}/>
                <form className='newRecipeForm' action="/upload/photo" encType="multipart/form-data" method="POST" onSubmit={this.onSubmitHandler}>
                    <div>
                        <label className='recipeTitleInput Label'>Title</label>
                        <input id='title' value={this.state.newRecipe.title} placeholder='What is the title of your dish?' className='Input' onChange={this.onTitleChangeHandler}/>
                    </div>

                    <div>
                        <label className='recipeDetailsInput Label'>Recipe</label>
                        {/* <textarea id='details' value={this.state.newRecipe.details} className='Input' placeholder='Enter ingredients, timing and recipe steps...' onChange={this.onChangeHandler} rows='10'/> */}
                        <TextEditor onTextEditorChangeHandler={this.onTextEditorChangeHandler}/>
                    </div>
                    <PhotoUploader handleImageSelect={this.onImageChangeHandler} image={this.state.image}/>
                    <button type='submit' className='submitButton'>Save</button>

                </form>
            </div>
        )

    }
}

export default AddRecipeForm