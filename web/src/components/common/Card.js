import { getImage, reduceClass } from 'lib'
import React, { useState } from 'react'

const Card = ({ item, onClick }) => {
  const handleClick = onClick ?? goToDatabase

  // console.log(item);
  

  function goToDatabase() {
    window.open(item.ygoprodeck_url)
  }

  return (
    <button
      className={reduceClass([
        'aspect-card',
        'bg-cover',
        'w-full'
      ])}
      onClick={() => handleClick(item)}

      // CAN'T MAKE DYNAMICALLY PULLED BACKGROUND IMAGES WITH TAILWIND (without dark magic)
      style={{
        backgroundImage: `url(${getImage(item.id)})`
      }}
    >


    </button>
  )
}

export default Card