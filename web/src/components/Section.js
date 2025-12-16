import React  from 'react'
import Box from './Box'

const Section = ({ ...rest }) => {

  return (
    <Box noFlex fullW element='section' {...rest} />
  )
}

export default Section