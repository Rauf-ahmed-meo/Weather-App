


import React from 'react'

const Search = ({search, setsearch, handleSearch}) => {
  return (
    <div>
      <input type="text" 
      onChange={(e)=>{setsearch(e.target.value)}}
      value={search}
      />
      <button onClick={()=>{handleSearch()}}>Weather</button>
    </div>
  )
}

export default Search
