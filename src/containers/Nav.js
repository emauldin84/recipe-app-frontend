import React from 'react'
import { NavLink } from 'react-router-dom'
import SearchBar from '../utils/SearchBar'


const Nav = (props) => {
    let history = props.history ? props.history : null
    let classes = props.recipes === null || props.recipes.length === 0 ? 'addRecipe pulse' : 'addRecipe'
    let addNew = props.loggedIn ? <NavLink to='/new-recipe' title='Add New Recipe' className={classes}>+</NavLink> : null
    let logOut = props.loggedIn ? <NavLink to='/login' className='signOut' onClick={props.handleSignOut}>Sign out</NavLink> : null
    let clearSearchClass = props.search.length > 0 ? 'clearSearch': 'hideClearSearch'
    
    let search = history === '/' ? 
        <div className='searchBarContainer'>
            <SearchBar 
                search={props.search}
                handleSearch={props.handleSearch}
                recipes={props.recipes}
            />
            <div className={clearSearchClass} onClick={props.handleClearSearchBar}>clear</div>
        </div>
    
    : null

    let route = props.loggedIn ? '/' : '/login'
    
    return (
        <div className='navContainer container'>
            <div className='navContainer'>
                <NavLink to={route} className='titleLogo'><img alt="Chef Caitlin" src="./media/PM-168.png" className='chef-icon'/><h1 className='title'>C's Recipes</h1></NavLink>
                <ul>
                    {addNew}
                </ul>
                    {logOut}
            </div>
            {search}
        </div>
    )
}

export default Nav