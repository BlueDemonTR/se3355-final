
import { Box, CardDisplay, Footer, FullScreenLoading, Nav } from 'components'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Homepage } from 'screens'
import User from './User'
import NonUser from './NonUser'

const Auth = () => {
  const navigatorLoading = useSelector(state => state.appState?.loadingButton === 'navigator'),
    userId = useSelector(state => state.user?._id)

  return (
    <Box relative>
      {navigatorLoading && (
        <FullScreenLoading />
      )}

      <CardDisplay />

      <Nav />

      {userId ? <User /> : <NonUser /> }

      <Footer />
    </Box>
  )
}

export default Auth