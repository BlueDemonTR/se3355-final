import { reduceClass, style } from 'lib'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Text = ({
  item
}) => {
  const { name, url } = item,
    navigate = useNavigate()
  
  return (
    <span
      className={reduceClass(style.hyperText)}
      onClick={() => navigate(url)}
    >
      {name}
    </span>
  )
}

export default Text