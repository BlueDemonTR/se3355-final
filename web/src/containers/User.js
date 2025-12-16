import { ws } from 'lib'
import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Account, Cards, Homepage } from 'screens'

const User = ({  }) => {

	useEffect(() => {
		ws.connect()
	}, [])

  return (
    <Routes>
      <Route exact path='/' element={<Homepage />} />
      <Route exact path='/account' element={<Account />} />
      <Route exact path='/cards' element={<Cards />} />
    </Routes>
  )
}

export default User