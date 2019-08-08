import React, { Component } from 'react'
import axios from 'axios'

import RecipesContainer from '../components/RecipesContainer'

class Dashboard extends Component {
    state = {
        recipes: null
    }

    componentDidMount() {
        axios.get(`/recipes/allrecipes`)
        .then(res => {
            const recipesData = res.data
            this.setState({
                recipes: recipesData,
            })
        })
        .catch (err => err)
        
    }

    render() {
        console.log(this.state.recipes)
        return(
            <div>
                <h1>C's Recipes</h1>
                <RecipesContainer recipes={this.state.recipes}/>
            </div>
        )
    }
}

export default Dashboard