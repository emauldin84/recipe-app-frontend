import React, {Component} from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'


import './App.css';
// import Dashboard from './containers/Dashboard'
import Recipes from './components/Recipes'
import Recipe from './components/Recipe'
import Nav from './containers/Nav'
import AddRecipeForm from './components/AddRecipeForm'
import Register from './components/Register'
import Login from './components/Login'
// import SearchBar from './utils/SearchBar'


class App extends Component {

  state = {
    recipes: null,
    selectedRecipe: null,
    editedDetails: null,
    search: '',
    userId: null,
    loggedIn: false,
    loading: true,
    history: null,
}

// shouldComponentUpdate(prevProps, prevState){
//   console.log('shouldComponentUpdate')
//   console.log('Does state match prevState?', this.state.recipes === prevState.recipes)
//   return this.state.recipes !== prevState.recipes
// }

componentDidMount() {
  this.checkForSession()
}

componentDidUpdate(prevProps, prevState) {
  if (prevState.history !== this.props.history.location.pathname) {
    this.setHistoryState()

  }

  if(prevState.recipes !== null && prevState.recipes === this.state.recipes) {
    this.handleGetRecipes()
  }
}

setHistoryState = () => {
  this.setState({
    history: this.props.history.location.pathname
  })
}

handleLoading = () => {
  this.setState({
    loading: false,
  })
}

setUserState = (id) => {
  this.setState({
    userId: id,
    loggedIn: true,
  })
}

checkForSession = () => {
  axios.get('/session')
  .then ( async res => {
    if(res.data.id){
      this.setUserState(res.data.id)
    }
    if(res.data.message){
      console.log('user not logged in')
      this.handleLoading()
    }
  })
  // console.log('state user', this.state.user)
  .then(() => {
    if(this.state.userId){
      this.handleGetRecipes()
      this.handleLoading()
    }
  })

}

handleGetRecipes = () => {
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
    this.setState({
        selectedRecipe: recipe
    }, () => this.props.history.push(`/recipe/${recipeId}`))
    window.scrollTo(0, 0) 
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
      userId: null,
      recipes: null,
    })
  )
}


  render() {
    let routes = null

      if(this.state.loggedIn && !this.state.loading) {
        // PRIVATE ROUTES
        routes = (
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
                                  userId={this.state.userId}
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
      } 
      if (!this.state.loggedIn && !this.state.loading) {
        // PUBLIC ROUTES
        routes = (
          <div>
            <Route
              path={'/register'}
              render={(props) => <Register
                              {...props}
                              checkForSession={this.checkForSession}
                              />}
            />
            <Route
              path={'/login'}
              render={(props) => <Login
                              {...props}
                              checkForSession={this.checkForSession}
                              />}
            />
            
            <Redirect to='/login' />
        </div>
        )
      }

    return (
      <div className="App">
        <Nav 
          loggedIn={this.state.loggedIn} 
          recipes={this.state.recipes} 
          handleSignOut={this.handleSignOut}
          search={this.state.search}
          handleSearch={this.handleSearch}
          history={this.state.history}
          handleClearSearchBar={this.handleClearSearchBar}/>
        <div className='body'>
        {routes}

        </div>
      </div>
    );

  }
}

export default withRouter(App);
