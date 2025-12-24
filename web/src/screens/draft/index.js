import { Box, Button, CardList, ContentArea, Title } from 'components'
import { Api, reduceClass } from 'lib'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Draft = ({  }) => {
  const lobby = useSelector(state => state.lobby),
    userId = useSelector(state => state.user._id),
    isLoading = useSelector(state => state.appState.loadingButton === 'cardPack'),
    { currentPack, drafted, cardData, attendants, owner, takenTurn } = lobby,
    isOwner = owner === userId,
    mappedCurrentPack = useMemo(() => mapCards(currentPack), [cardData, currentPack]),
    mappedDrafted = useMemo(() => mapCards(drafted), [cardData, drafted]),
    dispatch = useDispatch()

  async function pickCard(card) {
    if(takenTurn) return

    dispatch({
      type: 'TAKE_TURN',
      payload: userId
    })

    dispatch({
      type: 'PICK_CARD',
      payload: card.id
    })

    const res = await Api.post('/lobby/pick', { lobbyId: lobby._id, cardId: card.id  }, 'cardPack')
    if(!res)  {
      dispatch({
        type: 'RETAKE_TURN',
        payload: userId
      })

      return
    }
  }

  async function kickUser(user) {
    // TODO
    const res = await Api.post('/lobby/kick', { lobbyId: lobby._id, userId: user._id })
    
  }

  function mapCards(cards) {
    return cards.map(x => cardData[x])
  }
  
  return (
    <ContentArea>
      <Box directionSwap gap='gap-2' noFlex>
        {attendants.map(x => (
          <Button 
            disabled={!isOwner || x._id === userId}
            text={`${x.username} ${(x._id === userId ? takenTurn : x.takenTurn) ? '✅' : '⏰'}`}
            onClick={() => kickUser(x)}
          />
        ))}
      </Box>

      <div
        className={reduceClass([
          'p-2',
          'rounded-xl',
          'relative',
          takenTurn ? 'bg-secondary' : 'bg-tertiary'
        ])}
      >
        {isLoading && (
          <div
            className={reduceClass([
              'absolute',
              'w-full',
              'h-full',
              'bg-black',
              'opacity-25',
              'top-0',
              'left-0',
              'rounded-xl',
            ])}
          >
          </div>
        )}
        <CardList 
          cards={mappedCurrentPack}
          colCount={2}
          handleClick={pickCard}
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