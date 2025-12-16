import { reduceClass } from 'lib'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Text from './Text'

const ErrRes = () => {
	const err = useSelector(state => state.appState?.errRes?.err),
		dispatch = useDispatch()

	useEffect(() => {
		if(err) setTimeout(() => dispatch({
			type: 'HANDLE_RES',
			payload: {}
		}), 10000)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [err])

	return (
		<div
			className={reduceClass([
				'fixed',
				'right-5',
				'top-5',
				'p-4',
				'rounded-xl',
				'bg-pokeball-red',
				err ? 'opacity-100' : 'opacity-0',
				'transition-opacity',
				'z-50'
			])}
		>
			<Text col='text-pokeball-white' bold>
				{err}
			</Text>
		</div>
	)
}

export default ErrRes