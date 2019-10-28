import React from 'react'
import { NavLink } from 'react-router-dom'


const Nav = (props) => {
    let classes = props.recipes === null || props.recipes.length === 0 ? 'addRecipe pulse' : 'addRecipe'
    let addNew = props.loggedIn ? <NavLink to='/new-recipe' title='Add New Recipe' className={classes}>+</NavLink> : null
    let logOut = props.loggedIn ? <NavLink to='/login' className='signOut' onClick={props.handleSignOut}>Sign out</NavLink> : null
    return (
        <div className='navContainer container'>
            <NavLink to='/' className='titleLogo'><img src="./media/PM-168.png" className='chef-icon'/><h1 className='title'>C's Recipes</h1></NavLink>
            <ul>
                {addNew}
            </ul>
                {logOut}
        </div>
    )
}

export default Nav