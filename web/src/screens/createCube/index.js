import { Box, Button, Card, CardList, CardListWithSearch, ContentArea, Input, Text } from 'components'
import { Api, reduceClass } from 'lib'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ImportButton } from './components'

const CreateCube = ({  }) => {
  const { id } = useParams(),
    [name, setName] = useState(''),
    [cards, setCards] = useState([]),
    canSave = cards.length >= 80 && !!name,
    navigate = useNavigate()

  useEffect(() => {
    getCube()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  async function getCube() {
    if(!id) return

    const res = await Api.get('/cube/get', { id }, 'navigator')
    if(!res) return

    setName(res.name)
    setCards(res.cards)
  }

  async function saveCube() {
    const cardsMap = new Map()

    for (const { id } of cards) {
      if(!cardsMap.has(id)) {
        cardsMap.set(id, 1)
        continue
      }

      cardsMap.set(id, cardsMap.get(id) + 1)
    }
    
    const data = {
      id,
      name,
      cards: [...cardsMap.entries()].map(([id, count]) => ({ id, count }))
    }

    const res = await Api.post(
      data.id
        ? '/cube/edit'
        : '/cube/create', 
      data, 
      'navigator'
    )
    if(!res) return

    navigate(`/cube/${res}`)
  }

  function handleAddCard(card) {
    setCards([card, ...cards])
  }

  function handleRemoveCard(card) {
    const idx = cards.findIndex(x => x === card)
    setCards(cards.filter((x, i) => i !== idx))
  }

  return (
    <ContentArea>
      <div 
        className={reduceClass([
          'flex',
          'flex-col',
          'bg-tertiary',
          'p-4',
          'border-2',
          'border-primary',
          'rounded-lg',
          'gap-2'
        ])}
      >
        <Input 
          value={name}
          onChangeText={setName}
          label='Name'
          placeholder='Enter a name'
        />

        <CardList
          cards={cards}
          colCount={2}
          handleClick={handleRemoveCard}
        />

        <Box justifyBetween directionSwap noFlex gap='gap-2'>
          <ImportButton 
            setCards={setCards}
          />

          <Box noFlex vertical alignCenter gap='gap-2'>
            <Button 
              text='Save'
              action='auth'
              disabled={!canSave}
              onClick={saveCube}
            />

            <Text>
              {cards.length}/80
            </Text>
          </Box>
        </Box>
      </div>

      <CardListWithSearch 
        handleSelect={handleAddCard}
      />
    </ContentArea>
  )
}

export default CreateCube