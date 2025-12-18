import { Button, CardList, ContentArea, Text } from 'components'
import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

const LobbyLeave = ({ showDeck }) => {
  const drafted = useSelector(state => state.lobby?.drafted),
    cardData = useSelector(state => state.lobby?.cardData),    
    mappedDrafted = useMemo(() => mapCards(drafted), [cardData, drafted])
    
  function mapCards(cards) {
    return cards.map(x => cardData[x])
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
    </ContentArea>

  )
}

export default LobbyLeave