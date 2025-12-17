import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Routes } from 'react-router-dom'
import { Draft, LobbyLeave, Lobby as LobbyScreen } from 'screens'

const Lobby = ({  }) => {
  const lobbyStatus = useSelector(x => x.lobby?.status)

  switch(lobbyStatus) {
    case 'waiting':
      return <LobbyScreen />
    case 'drafting':
      return <Draft />

    default:
      return (
        <LobbyLeave />
      )


  }

}

export default Lobby