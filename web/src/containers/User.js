import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Homepage } from 'screens'

const User = ({  }) => {

  return (
    <Routes>
      <Route exact path='/' element={<Homepage />} />
    </Routes>
  )
}

export default User