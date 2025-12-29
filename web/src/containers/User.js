import { ws } from 'lib'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Account, Cards, CreateCube, CreateLobby, Cube, Cubes, Homepage, Lobbies, LobbyJoin } from 'screens'
import Lobby from './Lobby'

const User = ({  }) => {
  const lobbyId = useSelector(state => state.lobby?._id)

	useEffect(() => {
		ws.connect()
	}, [])

  if(lobbyId) return <Lobby />

  return (
    <Routes>
      <Route exact path='/' element={<Homepage />} />
      <Route exact path='/account' element={<Account />} />
      <Route exact path='/cards' element={<Cards />} />
      <Route exact path='/cubes' element={<Cubes isLoggedIn />} />
      <Route exact path='/create-cube' element={<CreateCube />} />
      <Route exact path='/edit-cube/:id' element={<CreateCube />} />
      <Route exact path='/cube/:id' element={<Cube />} />
      <Route exact path='/create-lobby/:cubeId' element={<CreateLobby />} />
      <Route exact path='/lobbies' element={<Lobbies />} />
      <Route exact path='/join' element={<LobbyJoin />} />
      <Route exact path='*' element={<Homepage />} />
    </Routes>
  )
}

export default User