import React from 'react'
import { NavLink } from 'react-router-dom'


const Nav = (props) => {
    return (
        <div className='navContainer'>
            <NavLink to='/' className='title'>C's Recipes</NavLink>
            <ul>
                <NavLink to='/new-recipe' className='addRecipe'>+</NavLink>
            </ul>
        </div>
    )
}

export default Nav