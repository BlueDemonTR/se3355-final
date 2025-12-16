import React from 'react'
import { useNavigate } from 'react-router-dom'
import { reduceClass, style } from 'lib'
import Button from 'components/common/Button'


const Nav = () => {
  const navigate = useNavigate()

  const items = [
    { text: 'Homepage', icon: '', address: '/' },
    { text: 'Cubes', icon: '', address: '/cubes' },
    { text: 'Cards', icon: '', address: '/cards' },
    { text: 'Lobbies', icon: '', address: '/lobbies' },
    { text: 'Account', icon: '', address: '/account' },
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