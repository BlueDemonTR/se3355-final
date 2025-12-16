import Box from 'components/common/Box'
import Card from 'components/common/Card'
import { reduceClass } from 'lib'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Filters, Paginator } from './components'

const CardList = ({ 
  cards = [],
  handleClick,
  colCount = 4,
  hideFilters,
  onEndReached = () => null, 
  endReached: dataEndReached = true 
}) => {
  const [page, setPage] = useState(0),
    [rowSize, setRowSize] = useState(10),
    [columnCount, setColumnCount] = useState(colCount),
    [filters, setFilters] = useState([]),
    listRef = useRef(null),
    pageCount = rowSize * columnCount,
    filteredCards = useMemo(filterCards, [cards, filters]),
    currentCards = useMemo(() => filteredCards.slice(page * pageCount, (page + 1) * pageCount), [filteredCards, page, pageCount]),
    listEndReached = currentCards.findLast(() => true) === cards.findLast(() => true),
    endReached = dataEndReached && listEndReached

  useEffect(() => {
    if(listEndReached) onEndReached()
  }, [listEndReached])

  useEffect(() => {
    if(listRef.current) {
      const item = listRef.current
      
      if(item.children.length) {
        const cardWid = item.children[0].clientWidth,
          rowSize = Math.floor(item.clientWidth / cardWid)

        setRowSize(rowSize)

        setColumnCount(rowSize <= 5 ? colCount * 2 : colCount)
      }
    }
  }, [currentCards, colCount])

  function handleChangeFilters(val) {
    setFilters(val)
    setPage(0)
  }

  function filterCards() {
    if(!filters.length || hideFilters) return cards

    const filteredCards = cards.filter(x => {
      for (const { filter } of filters) {
        if(filter(x)) return true
      }

      return false
    })

    return filteredCards
  }

  return (
    <Box gap='gap-1' noFlex>
      {!hideFilters && (
        <Filters 
          selected={filters}
          handleSelect={handleChangeFilters}        
        />
      )}

      <div
        className={reduceClass([
          'flex',
          'flex-wrap',
          'justify-between',
          'content-start',
          'w-full'
        ])}
        ref={listRef}
        style={{ height: 150 * columnCount }}
      >
        {currentCards.map((x, i) => (
          <div 
            className={reduceClass([
              'w-24'
            ])}
          >
            <Card
              key={x.id}
              item={x}
              onClick={handleClick}
            />
          </div>
        ))}
      </div>
      
      <Paginator 
        page={page}
        setPage={setPage}
        endReached={endReached}
      />
    </Box>
  )
}

export default CardList