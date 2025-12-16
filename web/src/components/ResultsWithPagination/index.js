import Collapsable from 'components/Collapsable'
import ContentArea from 'components/ContentArea'
import Title from 'components/Title'
import { GenerationFilter, ListItem, ListWrapper, Paginator } from './components'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'


const ResultsWithPagination = ({ items, navigateTo, title, pullMore, pullMoreAction, noFilter }) => {
  const [page, setPage] = useState(0),
    [endReached, setEndReached] = useState(false),
    [filters, setFilters] = useState([]),
    filteredItems = filterItems(items),
    currentItems = filteredItems.slice(page * global.PAGE_SIZE, (page + 1) * global.PAGE_SIZE),
    dispatch = useDispatch()

  function filterItems(items) {
    if(!filters.length) return items

    return items.filter(x => filters.includes(x.generation))
  }

  function handleChangeFilters(id) {
    let newFilters = [...filters]

    if(filters.includes(id)) {
      newFilters = newFilters.filter(x => x !== id)
    } else {
      newFilters.push(id)
    }

    setFilters(newFilters)

    setPage(0)
  }

  async function fetchItems() {
    const pulled = [],
      requiredCount = (page + 1) * global.PAGE_SIZE

    setEndReached(false)

    let len = filterItems(items)?.length
    
    dispatch({
      type: 'LOADING_BUTTON',
      payload: 'navigator'
    })

    while (len <= requiredCount) {
      const res = await pullMore((items?.length ?? 0) + pulled.length)

      if(!res) break

      pulled.push(...res.data)

      len += filterItems(res.data)?.length
      
      if(res.endReached) {
        setEndReached(true)
        break
      }
    }
    
    dispatch({
      type: 'LOADING_BUTTON',
      payload: null
    })

    dispatch({
      type: pullMoreAction,
      payload: pulled
    })
  }
  
  useEffect(() => {
    fetchItems()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters])
    
  return (
    <ContentArea>
      <Title>
        {title}
      </Title>

      {!noFilter && (
        <Collapsable
          title='Filter by generation'
          content={(
            <GenerationFilter 
              selected={filters}
              handleSelect={handleChangeFilters}
            />
          )}
        />
      )}

      <ListWrapper>
        {currentItems?.map((x, i) => (
          <ListItem item={x} key={i} navigateTo={navigateTo} />
        ))}
      </ListWrapper>

      <Paginator 
        setPage={setPage}
        page={page}
        endReached={endReached}
      />
    </ContentArea>
  )
}

export default ResultsWithPagination