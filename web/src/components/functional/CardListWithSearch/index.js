import Box from 'components/common/Box'
import Input from 'components/common/Input'
import { Api } from 'lib'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardList from '../CardList'
import Section from 'components/common/Section'

let timer
const Cards = ({ handleSelect }) => {
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
    if(search.length < 3) return

    const res = await Api.get('/cardDatabase/search', { name: search }, 'navigator')
    if(!res) return

    setResults(res)
  }

  function handleChangeSearch(val) {
    clearTimeout(timer) 

    timer = setTimeout(() => searchCards(val), 300)

    setSearch(val)
  }

  return (
    <Section gap='gap-2'>
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
        handleClick={handleSelect}
      />
    </Section>
  )
}

export default Cards