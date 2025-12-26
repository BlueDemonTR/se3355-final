import { Box, Button, Card, CardList, ContentArea, Title } from 'components'
import { Api } from 'lib'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const Cube = ({  }) => {
  const { id } = useParams(),
    [item, setItem] = useState(null),
    isOwner = useSelector(x => x.user?._id === item?.owner),
    isAdmin = useSelector(x => x.user?.isAdmin),
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

  async function banCube() {
    if(!window.confirm('Are you sure?')) return

    const res = await Api.delete('/cube/removeAdmin', { id }, 'navigator')
    
    navigate('/cubes')
  }

  if(!item) return null

  return (
    <ContentArea>
      <Box noFlex alignCenter directionSwap gap='gap-2' fullW justifyBetween>
        <Title>
          {item.name}
        </Title>

          <Box noFlex alignCenter vertical gap='gap-2'>
            {isOwner && (
              <React.Fragment>
                <Button 
                  text='Edit'
                  onClick={() => navigate(`/edit-cube/${id}`)}
                />

                <Button 
                  text='Delete'
                  onClick={deleteCube}
                />
              </React.Fragment>
            )}

            {isAdmin && (
              <Button 
                text='Ban Cube'
                onClick={banCube}
              />
            )}
          </Box>
      </Box>

      <CardList
        cards={item.cards}
      />
      
      <Button 
        text='Play this cube'
        onClick={() => navigate(`/create-lobby/${id}`)}
      />
    </ContentArea>
  )
}

export default Cube