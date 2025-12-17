import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Api, logout, reduceClass, style } from 'lib'
import Button from 'components/common/Button'
import { useDispatch, useSelector } from 'react-redux'


const Nav = () => {
  const navigate = useNavigate(),
    lobbyId = useSelector(state => state.lobby?._id),
    dispatch = useDispatch()

  async function leaveLobby() {
    const res = await Api.get('/lobby/leave', { id: lobbyId }, 'navigator')
    if (!res) return

    dispatch({
      type: 'CLEAR_LOBBY_DATA'
    })
  }


  const items = lobbyId 
    ? [ 
      { text: 'Leave Lobby', onClick: leaveLobby },
      { text: 'Logout', onClick: logout },
    ] : [
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
            onClick={() => x.onClick ? x.onClick() : navigate(x.address)}
          />
        ))}
      </div>
    </nav>
  )
}

export default Nav