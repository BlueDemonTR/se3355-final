import Box from 'components/common/Box'
import Button from 'components/common/Button'
import React from 'react'
import { useSelector } from 'react-redux'

const GenerationFilter = ({ selected = [], handleSelect }) => {
  const generations = useSelector(state => state.data?.generations)

  return (
    <Box gap='gap-1'>
      {generations.map(({ name, id }, i) => (
        <Button
          key={i}
          text={name}
          onClick={() => handleSelect(id)}
          active={selected.includes(id)}
        />
      ))}
    </Box>
  )
}

export default GenerationFilter