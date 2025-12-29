import { Button, ContentArea, Input, Text, Title } from 'components'
import { Api } from 'lib'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const CreateLobby = ({  }) => {
  const { cubeId } = useParams(),
    [name, setName] = useState(''),
    [passcode, setPasscode] = useState(''),
    [maxLobbySize, setMaxLobbySize] = useState(2),
    [packSize, setPackSize] = useState(15),
    [draftSize, setDraftSize] = useState(60),
    navigate = useNavigate(),
    dispatch = useDispatch()

  async function createRoom() {
    const data = {
      name,
      passcode,
      cubeId,
      maxLobbySize: parseInt(maxLobbySize),
      packSize: parseInt(packSize),
      draftSize: parseInt(draftSize)
    }

    if(isNaN(data.maxLobbySize) || 2 > maxLobbySize || 8 < maxLobbySize) return alert('Invalid Lobby Size')
    if(!name?.length) return alert('Please Enter a Name')
    if(isNaN(data.packSize)) return alert('Invalid Pack Size')
    if(isNaN(data.draftSize)) return alert('Invalid Draft Size')

    const res = await Api.post('/lobby/create', data, 'navigator')
    if(!res) return

    dispatch({
      type: 'SET_LOBBY_DATA',
      payload: res
    })

    navigate(`/lobby`)
  }

  return (
    <ContentArea>
      <Input 
        label='Lobby Name'
        value={name}
        onChangeText={setName}
      />

      <Input 
        label='Passcode (leave empty for public)'
        type='password'
        value={passcode}
        onChangeText={setPasscode}
      />

      <Input 
        label='Max Lobby Size (2-8)'
        value={maxLobbySize}
        onChangeText={setMaxLobbySize}
      />

      <Input 
        label='Pack Size (How many packs will be opened per round)'
        value={packSize}
        onChangeText={setPackSize}
      />

      <Input 
        label='Draft Size (How many cards will be drafted until the draft ends)'
        value={draftSize}
        onChangeText={setDraftSize}
      />

      <Button 
        text='Create Room'
        onClick={createRoom}
      />
    </ContentArea>
  )
}

export default CreateLobby