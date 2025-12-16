import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Auth, Cards, Cubes, Homepage } from 'screens'

const NonUser = ({  }) => {

  return (
    <Routes>
      <Route exact path='/' element={<Homepage />} />
      <Route exact path='/account' element={<Auth />} />
      <Route exact path='/cards' element={<Cards />} />
      <Route exact path='/cubes' element={<Cubes />} />
    </Routes>
  )
}

export default NonUser