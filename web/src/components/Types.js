import React from 'react'
import Box from './Box'
import TypePlate from './TypePlate'

const Types = ({ types }) => {

  return (
    <Box vertical noFlex justifyAround gap='gap-2'>
      {types.map((item, i) => (
        <TypePlate
          key={i}
          item={item}
        />
      ))}
    </Box>
  )
}

export default Types