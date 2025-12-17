import { Card, ContentArea, ResultsWithPagination } from 'components'
import CardList from 'components/functional/CardList'
import { Api } from 'lib'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const Lobbies = ({  }) => {
  const [data, setData] = useState([]),
    dispatch = useDispatch()

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const res = await Api.get('/lobby/getHomepage')
    if(!res) return

    setData(res)
  }

  async function joinRoom(item) {
    const res = await Api.post('/lobby/join', { lobbyId: item._id })
    if(!res) return alert('Lobby is full or unavailable')
    
    dispatch({
      type: 'SET_LOBBY_DATA',
      payload: res
    })
  }

  return (
    <ContentArea>
      <ResultsWithPagination 
        items={data}
        title='Public Games'
        onClick={joinRoom}
      />
    </ContentArea>
  )
}

export default Lobbies