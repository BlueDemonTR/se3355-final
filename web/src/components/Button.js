import { reduceClass, style } from 'lib'
import React from 'react'
import { useSelector } from 'react-redux'

const Button = ({ text, onClick, disabled, loadingButton, styles = style.defaultButton, active }) => {
  const isLoading = useSelector(state => state.appState.loadingButton === loadingButton)

  function handleClick(e) {
    onClick(e)

    // Stops clicking through elements
		if (!e) e = window.event
		e.cancelBubble = true
		if (e.stopPropagation) e.stopPropagation()
  }

  return (
    <button
      className={reduceClass(styles)}
      onClick={handleClick}
      disabled={disabled || isLoading}
      data-status={active && 'active'}
    >
      {text}
    </button>
  )
}

export default Button