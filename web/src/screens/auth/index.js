import { Box, Button, ButtonSeperator, ContentArea, Input } from 'components'
import { Api, setToken } from 'lib'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const Auth = ({  }) => {
  const [username, setUsername] = useState(''),
    [password, setPassword] = useState(''),
    dispatch = useDispatch(),
    enabled = username.length >= 4 && password.length >= 8

  async function authorize(isLogin) {
    const data = { username, password }

    const res = await Api.post(
      isLogin ? '/user/login' : '/user/signup',
      data, 
      'auth'
    )
    if(!res) return

    dispatch({
      type: 'SET_USER',
      payload: res.user
    })

    setToken(res.token)
  }

  return (
    <ContentArea>
      <Input 
        label='Username'
        action='auth'
        value={username}
        onChangeText={setUsername}
      />

      <Input 
        label='Password'
        type='password'
        action='auth'
        value={password}
        submit={() => authorize()}
        onChangeText={setPassword}
      />

      <ButtonSeperator>
        <Button 
          text='Login'
          action='auth'
          disabled={!enabled}
          onClick={() => authorize(true)}
        />

        <Button 
          text='Sign up'
          action='auth'
          disabled={!enabled}
          onClick={() => authorize()}
        />
      </ButtonSeperator>
    </ContentArea>
  )
}

export default Auth