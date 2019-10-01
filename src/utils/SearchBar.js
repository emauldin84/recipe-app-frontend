import React from 'react'

const SearchBar = (props) =>{
    return(
        <div>
            <input value={props.search} placeholder='Search...' className='searchBar Input' onChange={props.handleSearch} autofocus="autofocus"/>
        </div>
    )
}

export default SearchBar