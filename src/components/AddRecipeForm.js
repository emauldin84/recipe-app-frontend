import React, {Component} from 'react'

import BackButton from '../utils/BackButton'
import PhotoUploader from '../utils/PhotoUploader'

class AddRecipeForm extends Component {
    state = {
        newRecipe: {
            title: null,
            recipe: null,
            image: null,
        },
    }

    onChangeHandler = (e) => {
        console.log(e.target.value)
    }

    onSubmitHandler = () => {
        console.log('submitting')
    }
    render() {
        return (
            <div>
                <BackButton handleClickedBackButton={this.props.handleClickedBackButton}/>
                <form className='newRecipeForm' onSubmit={this.onSubmitHandler}>
                    <div>
                        <label className='recipeTitleInput Label'>Title</label>
                        <input value='What is the title of your dish?' className='Input' onChange={(event) => this.onChangeHandler(event)}/>
                    </div>
                    <div>
                        <label className='recipeDetailsInput Label'>Recipe</label>
                        <textarea className='Input' value='Enter ingredients, timing and recipe steps...' onChange={(event) => this.onChangeHandler(event)} rows='10'/>
                    </div>
                    <PhotoUploader />
                    <button type='submit' className='submitButton'>Save</button>

                </form>
            </div>
        )

    }
}

export default AddRecipeForm