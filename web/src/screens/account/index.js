import { Button, ContentArea } from 'components'
import { logout } from 'lib'
import React, { useState } from 'react'

const Account = ({  }) => {

  return (
    <ContentArea>
      <Button 
        text='Logout'
        onClick={() => logout()}
      />
    </ContentArea>
  )
}

export default Account