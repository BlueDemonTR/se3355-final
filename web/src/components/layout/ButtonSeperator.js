import Box from 'components/common/Box'
import React, { useState } from 'react'

const ButtonSeperator = (props) => {

  return (
    <Box justifyBetween directionSwap noFlex gap='gap-2' { ...props } />
  )
}

export default ButtonSeperator