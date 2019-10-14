import React from 'react'
import { NavLink } from 'react-router-dom'


const Nav = (props) => {
    let classes = props.recipes === null || props.recipes.length === 0 ? 'addRecipe pulse' : 'addRecipe'
    return (
        <div className='navContainer'>
            <NavLink to='/' className='title'>C's Recipes</NavLink>
            <ul>
                <NavLink to='/new-recipe' className={classes}>+</NavLink>
            </ul>
        </div>
    )
}

export default Nav