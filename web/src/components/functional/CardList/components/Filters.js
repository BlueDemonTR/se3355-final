import Box from 'components/common/Box'
import React, { useState } from 'react'
import { filters } from '../lib'
import { reduceClass } from 'lib'

const Filters = ({ selected = [], handleSelect }) => {

  function isSelected(item) {
    return selected.find(x => x.label === item.label)
  }

  function onClick(item) {
    if(isSelected(item)) return handleSelect(selected.filter(x => x !== item))

    return handleSelect([...selected, item])
  }

  return (
    <Box
      directionSwap
      fullW
      justifyBetween
    >
      <div>
        {filters.types.map(item => (
          <button 
            className={reduceClass([
              item.bg,
              item.whiteText ? 'text-white' : 'text-black',
              'font-bold',
              'text-sm',
              'p-1',
              'hover:shadow-big-inner',
              isSelected(item) && 'animate-bounce'
            ])}
            status={'active'}
            onClick={() => onClick(item)}
          >
            {item.label}
          </button>
        ))}
      </div>

    </Box>
  )
}

export default Filters