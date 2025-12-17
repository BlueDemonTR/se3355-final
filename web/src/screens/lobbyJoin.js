import { Button, ContentArea, Input, Text } from 'components'
import { Api } from 'lib'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'

const LobbyJoin = ({  }) => {
  const [searchParams] = useSearchParams(),
    id = searchParams.get('id'), 
    isPublic = searchParams.get('public'),
    [password, setPassword] = useState(''),
    dispatch = useDispatch(),
    navigate = useNavigate('')

  async function joinRoom() {
    navigate('/')

    const res = await Api.post('/lobby/join', { lobbyId: id }, 'navigator')
    if(!res) return alert('Lobby is full or unavailable')
    
    dispatch({
      type: 'SET_LOBBY_DATA',
      payload: res
    })
  }

  async function joinPrivateRoom() {
    const res = await Api.post('/lobby/joinPrivate', { lobbyId: id, password }, 'navigator')
    if(!res) return alert('Lobby is full or unavailable')
    
    navigate('/')

    dispatch({
      type: 'SET_LOBBY_DATA',
      payload: res
    })
  }

  useEffect(() => {
    if(isPublic) joinRoom()
  }, [])

  return (
    <ContentArea>
      <Input
        label='Enter Room Passcode(You can enter anything if it is a public room)'
        value={password}
        onChangeText={setPassword}
        submit={joinPrivateRoom}
      />

      <Button onClick={joinPrivateRoom} text='Enter room' />
    </ContentArea>

  )
}

export default LobbyJoin