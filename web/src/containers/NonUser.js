import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Auth, Cards, Cube, Cubes, Homepage } from 'screens'

const NonUser = ({  }) => {

  return (
    <Routes>
      <Route exact path='/' element={<Homepage />} />
      <Route exact path='/account' element={<Auth />} />
      <Route exact path='/cards' element={<Cards />} />
      <Route exact path='/cubes' element={<Cubes />} />
      <Route exact path='/cube/:id' element={<Cube />} />
      
      <Route exact path='/create-cube' element={<Auth />} />
      <Route exact path='/lobbies' element={<Auth />} />
      <Route exact path='/create-lobby/*' element={<Auth />} />
    </Routes>
  )
}

export default NonUser