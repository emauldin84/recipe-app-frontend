import React, {Component} from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'


import './App.css';
// import Dashboard from './containers/Dashboard'
import Recipes from './components/Recipes'
import Recipe from './components/Recipe'
import Nav from './containers/Nav'
import AddRecipeForm from './components/AddRecipeForm'
import RegisterLogin from './components/RegisterLogin'

class App extends Component {
  state = {
    recipes: null,
    selectedRecipe: null,
    editedDetails: null,
    search: '',
}

componentDidMount() {
  console.log('edited details from APP',this.state.editedDetails)
    this.handleGetRecipes()
}

componentDidUpdate(prevProps, prevState) {
  if(prevState.recipes !== null && prevState.recipes === this.state.recipes) {
    this.handleGetRecipes()
  }

}

handleGetRecipes() {
  axios.get(`/recipes/allrecipes`)
    .then(res => {
      if(res.data !== this.state.recipes){
        const recipesData = res.data
        this.setState({
            recipes: recipesData,
        })
      }
    })
    .catch (err => err)
}

clickedRecipeHandler = (recipeId) => {
    let recipe = this.state.recipes.filter(rec => {
        return rec.id === recipeId
    })
    console.log('Clicked Recipe',recipe)
    this.setState({
        selectedRecipe: recipe
    }, () => this.props.history.push(`/recipe/${recipeId}`), console.log('clicked recipe handler',this.state.selectedRecipe))
    
}

clickedBackButtonHandler = () => {
  console.log('back to the future')
  this.props.history.goBack()
}

onTextEditorChangeHandlerEdit = (editedDetails) => {
      this.setState({
          editedDetails
      }, console.log('this.state.editedDetails from App', this.state.editedDetails))
    }

handleSearch = (e) => {
  this.setState({
    search: e.target.value
  })
}


  render() {
    let routes = (
      <div>
        <Nav recipes={this.state.recipes}/>
        <Switch>
          <Route
            path='/register'
            render={(props) => <RegisterLogin
                            {...props}
                            />}
          />
          <Route 
            path='/recipe/:id' 
            render={(props) => <Recipe 
                            {...props} 
                            selectedRecipe={this.state.selectedRecipe}
                            editedDetails={this.state.editedDetails}
                            handleClickedBackButton={this.clickedBackButtonHandler}
                            onTextEditorChangeHandlerEdit={this.onTextEditorChangeHandlerEdit}/>} />
          <Route
            path='/new-recipe'
            render={(props) => <AddRecipeForm
                                {...props}
                                handleClickedBackButton={this.clickedBackButtonHandler}/>} />
          <Route 
            path='/' exact 
            render={(props) => <Recipes 
                            {...props} 
                            recipes={this.state.recipes}
                            search={this.state.search}
                            handleSearch={this.handleSearch}
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
