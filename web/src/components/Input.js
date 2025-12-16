import React from 'react'
import { useSelector } from 'react-redux'

const StyledInput = ({ submit, cancel, action, onChangeText, onChange, value = '', ...props }) => {

	const loadingButton = useSelector(state => state.appState.loadingButton)
	const loading = loadingButton && action === loadingButton

	function handleChange(e) {
		if(!onChangeText) return onChange(e)
		
		onChangeText(e.target.value)
	}

	function handleKeyDown(e) {
		if(loading) return

		if (e.key === 'Enter' && submit) return submit()
		if (e.key === 'Escape' && cancel) return cancel()
	}

  return (
    <input 
      onKeyDown={handleKeyDown} 
      {...props} 
      onChange={handleChange}
      value={value}
    />
  )
}

export default StyledInput
