import Collapsable from 'components/common/Collapsable'
import Title from 'components/common/Title'
import ContentArea from 'components/layout/ContentArea'
import React, { useEffect, useState } from 'react'
import { ListItem, ListWrapper, Paginator } from './components'
import Box from 'components/common/Box'

const PAGE_SIZE = 10

const ResultsWithPagination = ({ items, navigateTo, title }) => {
  const [page, setPage] = useState(0),
    currentItems = items.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    endReached = (page + 1) * PAGE_SIZE >= items.length

  return (
    <Box gap='gap-2'>
      <Title>
        {title}
      </Title>

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
    </Box>
  )
}

export default ResultsWithPagination