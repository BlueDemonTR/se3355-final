const defaultState = {
	_id: null 
}

const user = (state = defaultState, action) => {
	const { payload, type } = action

	switch (type) {
		case 'INITIAL_DATA':
			return {
				...state,
				...payload?.user
			}

		case 'SET_USER':
			return payload

		default:
			return state
	}
}

export default user