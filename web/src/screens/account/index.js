import { Button, ContentArea } from 'components'
import { Api, logout } from 'lib'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Account = ({  }) => {
  const isAdmin = useSelector(x => x.user.isAdmin)

  async function refreshCardDatabase() {
    const res = await Api.get('/cardDatabase/refetch', {}, 'navigator')
    if(!res) return
    
    alert('Refreshed card database')
  }

  return (
    <ContentArea>
      {isAdmin && (
        <Button 
          text='Refresh Card Database'
          onClick={() => refreshCardDatabase()}
        />        
      )}

      <Button 
        text='Logout'
        onClick={() => logout()}
      />
    </ContentArea>
  )
}

export default Account