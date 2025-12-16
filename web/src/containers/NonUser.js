import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Auth, Homepage } from 'screens'

const NonUser = ({  }) => {

  return (
    <Routes>
      <Route exact path='/' element={<Homepage />} />
      <Route exact path='/account' element={<Auth />} />
    </Routes>
  )
}

export default NonUser