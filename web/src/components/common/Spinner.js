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
        'text-center'
      ])}
    >
      Loading
    </div>
  )
}

export default Spinner