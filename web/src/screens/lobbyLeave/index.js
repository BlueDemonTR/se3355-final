import { Box, Button, CardList, ContentArea, Text } from 'components'
import { convertToYDKE, downloadFile } from 'lib'
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
  
  function exportAsYDKFile() {
    const main = mappedDrafted.filter(x => mainDeckBorders.includes(x.frameType)),
      extra = mappedDrafted.filter(x => !mainDeckBorders.includes(x.frameType))

    let text = `
      #created by cubes
      #main
      ${main.map(x => x.id).join('\n')}
      #extra
      ${extra.map(x => x.id).join('\n')}
      !side
    `

    downloadFile(text, 'draft_deck.ydk')
  }

  function exportAsCSV() {
    const map = new Map()

    for (const card of drafted) {
      if(!map.has(card)) map.set(card, 0)
      
      map.set(card, map.get(card) + 1)
    }

    downloadFile(
      [...map.entries()].map(([key, count]) => {
        const cardItem = cardData[key]

        console.log(cardItem, cardData, key)


        return `${key},"${cardItem.name}",${cardItem.humanReadableCardType},${count}`
      }).join('\n'),
      'draft_deck.csv'
    )
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
        <React.Fragment>
          <CardList 
            cards={mappedDrafted}
          />

          <Box justifyBetween directionSwap noFlex gap='gap-2'>
            <Box>
              <Button 
                text='Export as .ydk'
                onClick={exportAsYDKFile}
              />
            </Box>
            
            <Box>
              <Button 
                text='Export as CSV'
                onClick={exportAsCSV}
              />
            </Box>

            <Box>
              <Button 
                text='Copy ydke to clipboard'
                onClick={exportAsYDKE}
              />
            </Box>
          </Box>

        </React.Fragment>
      )}
    </ContentArea>

  )
}

export default LobbyLeave