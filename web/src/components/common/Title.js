import React from 'react'
import Text from './Text'
import Box from './Box'
import { textColors } from 'lib'

const Title = ({ children, otherNames = [], ...rest }) => {

  return (
    <Box noFlex element='header'>
      <Text size='text-3xl' bold>
        { children }
      </Text>

      {!!otherNames.length && (
        <Text col={textColors.GREY} size='text-xs'>
          (Otherwise known as {otherNames.join(', ')})
        </Text>
      )}
    </Box>
  )
}

export default Title