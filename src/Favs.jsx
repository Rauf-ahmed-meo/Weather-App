import React from 'react'

const Favs = ({names, handleClick, handleDelete}) => {
  return (
    <ul>
      {
        names?
        names.map((name)=>{
          return <div style={{display:"flex", alignItems:"center"}}><li style={{cursor:"pointer"}} onClick={()=>handleClick(name)}>{name} </li><button onClick={()=>{handleDelete(name)}}>Delete</button> </div>
        })
        :null
      }
    </ul>
  )
}

export default Favs
