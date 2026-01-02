import { getImage, reduceClass } from 'lib'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const Card = ({ item, onClick }) => {
  const clickEvent = onClick ?? goToDatabase,
    handleClick = global.isSmall 
      ? () => setTimeout(displayCard, 300)
      : clickEvent,
    dispatch = useDispatch()

  function goToDatabase() {
    window.open(item.ygoprodeck_url)
  }

  function displayCard() {
    dispatch({
      type: 'SELECT_CARD',
      payload: item
    })
  }

  return (
    <button
      className={reduceClass([
        'aspect-card',
        'bg-cover',
        'w-full'
      ])}
      onClick={() => handleClick(item)}
      onDoubleClick={() => clickEvent(item)}
      onMouseEnter={displayCard}
      // CAN'T MAKE DYNAMICALLY PULLED BACKGROUND IMAGES WITH TAILWIND (without dark magic)
      style={{
        backgroundImage: `url(${getImage(item.id)})`
      }}
    >
      
    </button>
  )
}

export default Card