import React from 'react'

const SearchBar = (props) =>{

    let search = props.recipes === null || props.recipes.length === 0 ? <p>Click the pulsating button in the top right to add your first recipe.</p> : <input value={props.search} placeholder='Search Recipes...' className='searchBar Input' onChange={props.handleSearch} autoFocus="autofocus"/>
    
    return(
        <div>
            {search}
            {/* <input value={props.search} placeholder='Search...' className='searchBar Input' onChange={props.handleSearch} autofocus="autofocus"/> */}
        </div>
    )
}

export default SearchBar