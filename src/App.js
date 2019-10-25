import React, {Component} from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'


import './App.css';
// import Dashboard from './containers/Dashboard'
import Recipes from './components/Recipes'
import Recipe from './components/Recipe'
import Nav from './containers/Nav'
import AddRecipeForm from './components/AddRecipeForm'
import Register from './components/Register'
import Login from './components/Login'


class App extends Component {
  constructor(props){
    super(props)
    console.log('constructor')
  }
  state = {
    recipes: null,
    selectedRecipe: null,
    editedDetails: null,
    search: '',
    user: null,
    loggedIn: false,
    loading: true,
}

// shouldComponentUpdate(prevProps, prevState){
//   console.log('shouldComponentUpdate')
//   console.log('Does state match prevState?', this.state.recipes === prevState.recipes)
//   return this.state.recipes !== prevState.recipes
// }

componentDidMount() {
  console.log('componentDidMount')
  this.checkForSession()
}

componentDidUpdate(prevProps, prevState) {
  console.log('componentDidUpdate')

  if(prevState.recipes !== null && prevState.recipes === this.state.recipes) {
    this.handleGetRecipes()
  }
}

handleLoading() {
  this.setState({
    loading: false,
  })
}

setUserState = (userData) => {
  this.setState({
    user: userData,
    loggedIn: true,
  })
}

checkForSession = () => {
  axios.get('/session')
  .then ( async res => {
    if(res.data.id){
      this.setUserState(res.data)
    }
    if(res.data.message){
      console.log('not loading session fast enough')
    }
    console.log('res.data',res.data)
  })
  // console.log('state user', this.state.user)
  .then(() => {
    if(this.state.user){
      console.log('getting recipes after session check')
      this.handleGetRecipes()
      this.handleLoading()
    }
  })

}

handleGetRecipes() {
  axios.get(`/recipes/allrecipes`)
    .then(res => {
      console.log('RECIPES',res.data)
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
    this.setState({
        selectedRecipe: recipe
    }, () => this.props.history.push(`/recipe/${recipeId}`))
    
}

clickedBackButtonHandler = () => {
  this.props.history.push('/')
}

onTextEditorChangeHandlerEdit = (editedDetails) => {
      this.setState({
          editedDetails
      })
    }

handleSearch = (e) => {
  this.setState({
    search: e.target.value
  })
}

handleClearSearchBar = () => {
  this.setState({
    search: '',
  })
}

handleSignOut = () => {
  axios.delete('/users/logout')
  .then(
    this.setState({
      loggedIn: false,
      user: null,
    })
  )
}


  render() {
  console.log('render')

    // let routes = null

      // if(this.state.loggedIn) {
        // PRIVATE ROUTES
        let routes = (
          <div>
            <Route
              path={'/recipe/:id'}
              render={(props) => <Recipe 
                              {...props} 
                              selectedRecipe={this.state.selectedRecipe}
                              editedDetails={this.state.editedDetails}
                              handleClickedBackButton={this.clickedBackButtonHandler}
                              onTextEditorChangeHandlerEdit={this.onTextEditorChangeHandlerEdit}/>} />
            <Route
              path={'/new-recipe'}
              render={(props) => <AddRecipeForm
                                  {...props}
                                  user={this.state.user}
                                  handleClickedBackButton={this.clickedBackButtonHandler}/>} />
            <Route 
              path={'/'} exact 
              render={(props) => <Recipes 
                              {...props} 
                              recipes={this.state.recipes}
                              search={this.state.search}
                              handleSearch={this.handleSearch}
                              handleClearSearchBar={this.handleClearSearchBar}
                              handleClickedRecipe={this.clickedRecipeHandler}/>} />
            <Redirect to='/' />  
          </div>
        )
      // } 
      if (!this.state.loggedIn) {
        // PUBLIC ROUTES
        routes = (
          <Switch>
            <Route
              path='/register'
              render={(props) => <Register
                              {...props}
                              checkForSession={this.checkForSession}
                              />}
            />
            <Route
              path='/login'
              render={(props) => <Login
                              {...props}
                              checkForSession={this.checkForSession}
                              />}
            />
            <Redirect to='/login' />
        </Switch>
        )
      }

    return (
      <div className="App">
        <Nav loggedIn={this.state.loggedIn} recipes={this.state.recipes} handleSignOut={this.handleSignOut}/>
        {this.state.loading ? null : routes}
      </div>
    );

  }
}

export default withRouter(App);
