import React from 'react'
import { NavLink } from 'react-router-dom'


const Nav = (props) => {
    return (
        <div className='navContainer'>
            <NavLink className='title'>C's Recipes</NavLink>
            <ul>
                <NavLink className='addRecipe'>+</NavLink>
            </ul>
        </div>
    )
}

export default Nav