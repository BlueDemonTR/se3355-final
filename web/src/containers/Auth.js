
import { Box, Footer, FullScreenLoading, Nav } from 'components'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Homepage } from 'screens'

const Auth = () => {
  const navigatorLoading = useSelector(state => state.appState?.loadingButton === 'navigator')

  return (
    <Box relative>
      {navigatorLoading && (
        <FullScreenLoading />
      )}
      <Nav />

      <Routes>
        <Route exact path='/' element={<Homepage />} />
      </Routes>

      <Footer />
    </Box>
  )
}

export default Auth