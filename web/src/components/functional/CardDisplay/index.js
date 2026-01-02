import Box from 'components/common/Box'
import Button from 'components/common/Button'
import Card from 'components/common/Card'
import Spinner from 'components/common/Spinner'
import Text from 'components/common/Text'
import { Api, reduceClass } from 'lib'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

let timer
const CardDisplay = ({  }) => {
  const selectedCard = useSelector(state => state.appState?.selectedCard),
    fetched = useSelector(state => state.appState?.cardData),
    [open, setOpen] = useState(false),
    dispatch = useDispatch()

  useEffect(() => {
    if(global.isSmall) setOpen(!!selectedCard)
    
    clearTimeout(timer)
    timer = setTimeout(() => fetchCard(), 100)
  }, [selectedCard?.id])

  async function fetchCard() {
    if(!selectedCard) return

    const res = await Api.get('/card/get', { id: selectedCard.id }, 'display')
    if(!res) return

    dispatch({
      type: 'SET_CARD_DATA',
      payload: res
    })
  }

  if(!selectedCard) return null

  return (
    <div
      className={reduceClass([
        'fixed',
        'left-4',
        'top-mobile-header',
        'md:top-header',
        'bg-tertiary',
        'rounded-xl',
        'overflow-y-scroll',
        'no-scrollbar', 
        'max-h-card-display',
        'z-10'
      ])}
    >
      {open
      ? (
        <Box>
          <div
            className={reduceClass([
              'flex',
              'flex-col',
              'w-64',
              'p-4',
              'gap-2'
            ])}
          >

            <Button 
              text='Hide'
              onClick={() => setOpen(false)}
            />
          
            <Card 
              item={selectedCard}
            />

            <Spinner 
              action='display'
            />

            {fetched && (
              <div>
                <Text bold>{fetched.name}</Text>

                <Text>
                  {[
                    !!fetched.level && `${fetched.typeline.includes('Xyz') ? 'Rank' : 'Level'} ${fetched.level}`,
                    !!fetched.linkval && `Link-${fetched.linkval}`,
                    !!fetched.scale && `Scale ${fetched.scale}`
                  ].filter(x => x).join(', ')}
                </Text>

                <Text>{fetched.linkmarkers?.join(', ')}</Text>
                
                <Text>{fetched.attribute} {fetched.typeline?.join('/') ?? (fetched.humanReadableCardType)}</Text>
                <Text size='text-sm'>{fetched.desc}</Text>
                <Text>{[fetched.atk, fetched.def].filter(x => x).join('/')}</Text>
              </div>
            )}
          </div>
        </Box>
      ) : (
        <div className={reduceClass([
          'hidden',
          'md:block'
        ])}> 
          <Button
            text='Show'
            onClick={() => setOpen(true)}
          />
        </div>
      )}

    </div>
  )
}

export default CardDisplay