import { Box, Button, ContentArea, Text, Title } from 'components'
import { Api } from 'lib'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Lobby = ({  }) => {
  const lobby = useSelector(state => state.lobby),
    userId = useSelector(state => state.user._id),
    inviteLink = `${window.location.origin}${process.env.PUBLIC_URL}#/join?id=${lobby._id}${lobby.public ? '&public=true' : ''}`,
    isOwner = lobby.owner === userId

  async function kickUser(user) {
    // TODO
    const res = await Api.post('/lobby/kick', { lobbyId: lobby._id, userId: user._id })
    
  }

  async function startDraft() {
    const res = await Api.post('/lobby/start', { lobbyId: lobby._id })
  }

  function copyLink() {
    window.navigator.clipboard.writeText(inviteLink)
  }
  
  if(!lobby) return

  return (
    <ContentArea>
      <Button 
        text='Copy Invite Link'
        onClick={copyLink}
      />

      <Text>Invite Link: {inviteLink}</Text>

      <Box noFlex gap='gap-1'>
        <Title>
          Users ({lobby.attendants.length}/{lobby.maxLobbySize}): {isOwner && '(You can kick users by clicking them)'}
        </Title>

        {lobby.attendants.map(x => (
          <Button text={x.username} disabled={!isOwner || x._id === userId} onClick={() => kickUser(x)} />
        ))}
      </Box>

      <Button text='Start Drafting' onClick={startDraft} disabled={lobby.attendants.length < 2 || !isOwner} />
    </ContentArea>
  )
}

export default Lobby