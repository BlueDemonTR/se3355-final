import React from 'react'
import { reduceClass, style } from 'lib'

const TypePlate = ({ item }) => {
  const { name, sprite } = item

  return (
    <div className={reduceClass(style.typePlate)}>
      <img
        alt={name} 
        src={sprite} 
      />
    </div>
  )
}

export default TypePlate