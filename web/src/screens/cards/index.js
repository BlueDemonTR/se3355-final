import { Card, ContentArea } from 'components'
import CardList from 'components/functional/CardList'
import { Api } from 'lib'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Cards = ({  }) => {
  const cards = useSelector(state => state.cards),
    [endReached, setEndReached] = useState(false),
    dispatch = useDispatch()

  async function fetchMore() {
    if(endReached) return

    const res = await Api.get('/cardDatabase/get', { skip: cards.length }, 'navigator')
    if(!res) return

    dispatch({
      type: 'CARDS_PUSH_MULTIPLE',
      payload: res.data
    })

    setEndReached(endReached)
  }

  return (
    <ContentArea>
      <CardList
        hideFilters
        cards={cards}
        onEndReached={fetchMore}
      />
    </ContentArea>
  )
}

export default Cards