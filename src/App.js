import React, {Component} from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'


import './App.css';
import Dashboard from './containers/Dashboard'
import Recipe from './components/Recipe'



class App extends Component {
  state = {
    recipes: null,
    selectedRecipe: null,
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

clickedRecipeHandler = (recipeId) => {
    let recipe = this.state.recipes.filter(rec => {
        return rec.id === recipeId
    })
    console.log(recipe)
    this.setState({
        selectedRecipe: recipe
    }, () => this.props.history.push(`/recipe/${recipeId}`))
    
}


  render() {
    let routes = (
      <Switch>
        <Route 
          path='/recipe/:id' 
          render={(props) => <Recipe 
                          {...props} 
                          selectedRecipe={this.state.selectedRecipe}/>} />
        <Route 
          path='/' exact 
          render={(props) => <Dashboard 
                          {...props} 
                          recipes={this.state.recipes} 
                          handleClickedRecipe={this.clickedRecipeHandler}/>} />
        <Redirect to='/' />
      </Switch>
    )

    return (
      <div className="App">
        {routes}
      </div>
    );

  }
}

export default withRouter(App);
