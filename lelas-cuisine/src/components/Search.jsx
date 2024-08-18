import React, { useEffect, useState } from 'react'
import searchIcon from '../assets/search-icon.png'
function Search({menuNames}) {
    // remember to fetch list of food names eg chicken, for the search state
    const [search,setSearch] = useState(
        menuNames.length > 1 ? menuNames[Math.floor(Math.random()*menuNames.length)] : 'Search'
    )
    return (
        <label htmlFor="search" className='searchLabel'>
            <img src={searchIcon} alt="Search" width='24' height='22.34' />
            <input
                type="text"
                name="Search"
                id="Search"
                value={search}
                onClick={(e)=>{
                    e.target.select()
                }}
                onChange={(e)=> setSearch(e.target.value)}
            />
        </label>
    )
}

export default Search