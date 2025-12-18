import React from 'react'
import { useNavigate } from 'react-router-dom'
import { reduceClass, style } from 'lib'
import Text from 'components/common/Text'

const ListItem = ({ navigateTo, item, onClick }) => {
  const { name, _id, sprite, title } = item,
    navigate = useNavigate()

  function handleClick() {
    if(onClick) return onClick(item)

    navigate(`/${navigateTo}/${_id}`)
  }

  return (
    <button 
      className={
        reduceClass(style.listItem)
      }
      onClick={() => handleClick()}
    >
      {!!sprite && (
        <img src={sprite} alt={`${name}'s sprite`}/>
      )}

      {!!title && (
        <Text size='text-2xl'>
          Gen {title}
        </Text>
      )}
      
      <Text taCenter>
        {name}
      </Text>
    </button>
  )
}

export default ListItem