import { Box, Button, Card, CardList, ContentArea, Title } from 'components'
import { Api } from 'lib'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const Cube = ({  }) => {
  const { id } = useParams(),
    [item, setItem] = useState(null),
    isOwner = useSelector(x => x.user?._id === item?.owner),
    navigate = useNavigate()

  useEffect(() => {
    fetch()
  }, [])

  async function fetch() {
    const res = await Api.get('/cube/get', { id }, 'navigator')
    if(!res) return navigate('/cubes')

    setItem(res)
  }

  async function deleteCube() {
    if(!window.confirm('Are you sure?')) return

    const res = await Api.delete('/cube/delete', { id }, 'navigator')
    
    navigate('/cubes')
  }

  if(!item) return null

  return (
    <ContentArea>
      <Box noFlex alignCenter directionSwap gap='gap-2' fullW justifyBetween>
        <Title>
          {item.name}
        </Title>

        {isOwner && (
          <Box noFlex alignCenter vertical gap='gap-2'>
            <Button 
              text='Edit'
              onClick={() => navigate(`/edit-cube/${id}`)}
            />

            <Button 
              text='Delete'
              onClick={deleteCube}
            />
          </Box>
        )}
      </Box>

      <CardList
        cards={item.cards}
      />
    </ContentArea>
  )
}

export default Cube