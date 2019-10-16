import React from 'react'
import { NavLink } from 'react-router-dom'


const Nav = (props) => {
    let classes = props.recipes === null || props.recipes.length === 0 ? 'addRecipe pulse' : 'addRecipe'
    let addNew = props.loggedIn ? <NavLink to='/new-recipe' title='Add New Recipe' className={classes}>+</NavLink> : null
    let logOut = props.loggedIn ? <NavLink to='/login' className='signOut' onClick={props.handleSignOut}>Sign out</NavLink> : null
    return (
        <div className='navContainer'>
            <NavLink to='/' className='title'>C's Recipes</NavLink>
            <ul>
                {addNew}
            </ul>
                {logOut}
        </div>
    )
}

export default Nav