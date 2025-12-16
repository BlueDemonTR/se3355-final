import { reduceClass, style } from 'lib'
import React from 'react'
import { useSelector } from 'react-redux'
import Text from './Text'

const StyledInput = ({ label = '', submit, cancel, action, onChangeText, onChange, value = '', ...props }) => {

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
    <div className={reduceClass(style.inputWrapperWrapper)}>
      {label && (
        <Text bold>
          {label}
        </Text>
      )}

      <div
        className={reduceClass(style.inputWrapper)}
      >
        <input
          className={reduceClass(style.input)}
          onKeyDown={handleKeyDown}
          {...props} 
          onChange={handleChange}
          value={value}
        />
      </div>

    </div>
  )
}

export default StyledInput
