import { Box, Button, Card, CardList, CardListWithSearch, ContentArea, Input, Text } from 'components'
import { Api, reduceClass } from 'lib'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateCube = ({  }) => {
  const [name, setName] = useState(''),
    [cards, setCards] = useState([]),
    canSave = cards.length > 80 && !!name,
    navigate = useNavigate()

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
      name,
      cards: Object.fromEntries(cardsMap)
    }

    const res = await Api.post('/cube/create', data, 'navigator')
    if(!res) return

    navigate(`/cube/${res}`)
  }

  function handleAddCard(card) {
    setCards([...cards, card])
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
          <Button
            text='Import CSV'
            onClick={() => console.log('bepis')}
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