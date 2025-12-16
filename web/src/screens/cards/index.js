import { Card, ContentArea, Input } from 'components'
import CardList from 'components/functional/CardList'
import { Api } from 'lib'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

let timer
const Cards = ({  }) => {
  const cards = useSelector(state => state.cards),
    [results, setResults] = useState([]),
    [search, setSearch] = useState(''),
    [endReached, setEndReached] = useState(false),
    dispatch = useDispatch(),
    searchExists = !!search

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

  async function searchCards(search) {
    console.log(search);
    
    if(search.length < 3) return

    const res = await Api.get('/cardDatabase/search', { name: search }, 'navigator')
    console.log(res)
    if(!res) return

    setResults(res)
  }

  function handleChangeSearch(val) {
    clearTimeout(timer) 

    timer = setTimeout(() => searchCards(val), 300)

    setSearch(val)
  }

  return (
    <ContentArea>
      <Input 
        label='Search'
        value={search}
        onChangeText={handleChangeSearch}
        placeholder='Enter Text Here'
      />

      <CardList
        hideFilters={!searchExists}
        cards={searchExists ? results : cards}
        onEndReached={searchExists ? () => null : fetchMore}
        endReached={endReached && !searchExists}
      />
    </ContentArea>
  )
}

export default Cards