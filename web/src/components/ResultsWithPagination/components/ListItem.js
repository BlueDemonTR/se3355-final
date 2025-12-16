import React from 'react'
import { useNavigate } from 'react-router-dom'
import { reduceClass, style } from 'lib'
import Text from 'components/Text'

const ListItem = ({ navigateTo, item }) => {
  const { name, id, sprite, title } = item,
    navigate = useNavigate()

  return (
    <button 
      className={
        reduceClass(style.listItem)
      }
      onClick={() => navigate(`/${navigateTo}/${id}`)}
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