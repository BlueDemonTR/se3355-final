import Box from 'components/Box'
import Button from 'components/Button'
import Text from 'components/Text'
import React from 'react'

const Paginator = ({ page, endReached, setPage }) => {
  const hasPrev = page > 0


  return (
    <Box
      element='footer'
      vertical 
      fullW 
      justifyBetween 
      noFlex
    >
      <Box>
        <Button
          text='Previous' 
          disabled={!hasPrev} 
          loadingButton='fetchPokemon' 
          onClick={() => setPage(page => page - 1)} 
        />
      </Box>

      <Box alignCenter justifyCenter>
        <Text size='text-lg'>{page + 1}</Text>
      </Box>

      <Box>
        <Button 
          text='Next' 
          disabled={endReached} 
          loadingButton='fetchGames' 
          onClick={() => setPage(page => page + 1)} 
        />
      </Box>
    </Box>
  )
}

export default Paginator