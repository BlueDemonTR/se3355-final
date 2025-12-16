import { ws } from 'lib'
import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Homepage } from 'screens'

const User = ({  }) => {

	useEffect(() => {
		ws.connect()
	}, [])

  return (
    <Routes>
      <Route exact path='/' element={<Homepage />} />
    </Routes>
  )
}

export default User