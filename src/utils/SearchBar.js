import React from 'react'

const SearchBar = (props) =>{
    return(
        <div>
            <input value={props.search} placeholder='Search...' className='searchBar Input imageUrlInput' onChange={props.handleSearch}/>
        </div>
    )
}

export default SearchBar