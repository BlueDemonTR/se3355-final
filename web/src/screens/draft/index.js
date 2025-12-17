import { CardList, ContentArea, Title } from 'components'
import { reduceClass } from 'lib'
import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

const Draft = ({  }) => {
  const lobby = useSelector(state => state.lobby),
    { currentPack, drafted, cardData } = lobby,
    mappedCurrentPack = useMemo(() => mapCards(currentPack), [cardData, currentPack]),
    mappedDrafted = useMemo(() => mapCards(drafted), [cardData, drafted])

  function mapCards(cards) {
    return cards.map(x => cardData[x])
  }
  
  return (
    <ContentArea>
      <div
        className={reduceClass([
          'p-2',
          'rounded-xl',
          'bg-tertiary'
        ])}
      >
        <CardList 
          cards={mappedCurrentPack}
          colCount={2}
        />
      </div>
      
      <Title>
        Drafted
      </Title>

      <CardList 
        cards={mappedDrafted}
        colCount={2}
      />
    </ContentArea>
  )
}

export default Draft