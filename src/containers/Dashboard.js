import React, { Component } from 'react'
// import axios from 'axios'

import RecipesContainer from '../components/RecipesContainer'

class Dashboard extends Component {

    render() {
        return(
            <div>
                <RecipesContainer
                    recipes={this.props.recipes}
                    handleClickedRecipe={this.props.handleClickedRecipe}/>
            </div>
        )
    }
}

export default Dashboard