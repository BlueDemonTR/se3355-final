import React from 'react'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { reduceClass, style } from 'lib'


const Nav = () => {
  const navigate = useNavigate()

  const items = [
    { text: 'Homepage', icon: '', address: '/' },
    { text: 'Pokémon', icon: '', address: '/pokemon' },
    { text: 'Games', icon: '', address: '/games' },
    { text: 'Regions', icon: '', address: '/regions' },
  ]

  return (
    <nav className={reduceClass(style.navigation)}>
      <div className={reduceClass(style.navigationInner)}>
        {items.map((x, i) => (
          <Button
            key={i}
            styles={style.navButton}
            text={x.text}
            onClick={() => navigate(x.address)}
          />
        ))}
      </div>
    </nav>
  )
}

export default Nav