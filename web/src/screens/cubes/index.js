import { Button, Card, ContentArea } from 'components'
import CardList from 'components/functional/CardList'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Cubes = ({ isLoggedIn }) => {
  const navigate = useNavigate()

  return (
    <ContentArea>
      {isLoggedIn && (
        <Button 
          text='Create Cube'
          onClick={() => navigate('/create-cube')}
        />
      )}

      🎲🎲🎲🎲🎲🎲🎲🎲🎲🎲
    </ContentArea>
  )
}

export default Cubes