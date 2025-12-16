import { Button, Card, ContentArea, Input, ResultsWithPagination } from 'components'
import CardList from 'components/functional/CardList'
import { Api } from 'lib'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

let timer
const Cubes = ({ isLoggedIn }) => {
  const [cubes, setCubes] = useState([]),
    [search, setSearch] = useState(''),
    [results, setResults] = useState([]),
    navigate = useNavigate(),
    searchExists = !!search.length

  useEffect(() => {
    fetchTopCubes()
  }, [])

  async function fetchTopCubes() {
    const res = await Api.get('/cube/getBest', {}, 'navigator')
    if(!res) return

    setCubes(res)
  }
  
  async function searchCards(search) {
    if(search.length < 3) return

    const res = await Api.get('/cube/search', { name: search }, 'navigator')
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
      {isLoggedIn && (
        <Button 
          text='Create Cube'
          onClick={() => navigate('/create-cube')}
        />
      )}

      <Input
        label='Search'
        placeholder='Search for cubes'
        value={search}
        onChangeText={handleChangeSearch}
      />

      <ResultsWithPagination 
        items={searchExists ? results : cubes}
        navigateTo='cube'
      />
    </ContentArea>
  )
}

export default Cubes