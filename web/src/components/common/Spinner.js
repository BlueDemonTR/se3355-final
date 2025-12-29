import { reduceClass } from 'lib'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Spinner = ({ action }) => {
  const active = useSelector(state => state.appState?.loadingButton === action)

  if(!active) return null

  return (
    <div 
      className={reduceClass([
        'animate-spin',
        'flex',
        'flex-none',
        'justify-center'
      ])}
    >
      <img 
        src={require('assets/poyocube.png')} 
        alt='pokeball' 
        className='w-10 h-10'
      />
    </div>
  )
}

export default Spinner