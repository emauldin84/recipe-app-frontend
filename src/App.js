import React, {Component} from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'


import './App.css';
import Dashboard from './containers/Dashboard'
import Recipe from './components/Recipe'
import Nav from './containers/Nav'
import AddRecipeForm from './components/AddRecipeForm'



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
    }, () => this.props.history.push(`/recipe/${recipeId}`), console.log('clicked recipe handler',this.state.selectedRecipe))
    
}

clickedBackButtonHandler = () => {
  console.log('back to the future')
  this.props.history.goBack()
}

  render() {
    let routes = (
      <div>
        <Nav />
        <Switch>
          <Route 
            path='/recipe/:id' 
            render={(props) => <Recipe 
                            {...props} 
                            selectedRecipe={this.state.selectedRecipe}
                            handleClickedBackButton={this.clickedBackButtonHandler}/>} />
          <Route
            path='/new-recipe'
            render={(props) => <AddRecipeForm
                                {...props}
                                handleClickedBackButton={this.clickedBackButtonHandler}/>} />
          <Route 
            path='/' exact 
            render={(props) => <Dashboard 
                            {...props} 
                            recipes={this.state.recipes} 
                            handleClickedRecipe={this.clickedRecipeHandler}/>} />
          <Redirect to='/' />
        </Switch>
      </div>
    )

    return (
      <div className="App">
        {routes}
      </div>
    );

  }
}

export default withRouter(App);
