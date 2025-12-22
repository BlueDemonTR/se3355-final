import { Box, Button, CardList, ContentArea, Text } from 'components'
import { convertToYDKE } from 'lib'
import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

const LobbyLeave = ({ showDeck }) => {
  const drafted = useSelector(state => state.lobby?.drafted),
    cardData = useSelector(state => state.lobby?.cardData),    
    mappedDrafted = useMemo(() => mapCards(drafted), [cardData, drafted]),
    mainDeckBorders = ['normal', 'effect', 'spell', 'trap', 'effect_pendulum']
  
  function mapCards(cards) {
    return cards.map(x => cardData[x])
  }
  


  function exportAsYDKE() {
    const main = mappedDrafted.filter(x => mainDeckBorders.includes(x.frameType)),
      extra = mappedDrafted.filter(x => !mainDeckBorders.includes(x.frameType))

    const url = convertToYDKE({
      main: Uint32Array.from(main.map(x => x.id)),
      extra: Uint32Array.from(extra.map(x => x.id)),
      side: Uint32Array.from([])
    })

    navigator.clipboard.writeText(url)

    alert('Copied deck to clipboard')
  }

  return (
    <ContentArea>
      <Text>
        This draft has ended.
      </Text>

      {showDeck && (
        <CardList 
          cards={mappedDrafted}
        />
      )}

      <Box justifyBetween directionSwap noFlex gap='gap-2'>
        <Box>
          <Button 
            text='Export as .ydk'
            disabled
          />
        </Box>
        
        <Box>
          <Button 
            text='Export as CSV'
            disabled
          />
        </Box>

        <Box>
          <Button 
            text='Copy to ydke as clipboard'
            onClick={exportAsYDKE}
          />
        </Box>
      </Box>
    </ContentArea>

  )
}

export default LobbyLeave