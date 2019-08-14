import React, {Component} from 'react'

import BackButton from '../utils/BackButton'

class AddRecipeForm extends Component {
    state = {
        newRecipe: null,
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
                <form onSubmit={this.onSubmitHandler}>
                    <div>
                        <label className='recipeTitleInput Label'>Title</label>
                        <input value='title' className='Input' onChange={(event) => this.onChangeHandler(event)}/>
                    </div>
                    <div>
                        <label className='recipeDetailsInput Label'>Recipe</label>
                        <textarea className='Input' value='recipe' onChange={(event) => this.onChangeHandler(event)}/>
                    </div>

                </form>
            </div>
        )

    }
}

export default AddRecipeForm