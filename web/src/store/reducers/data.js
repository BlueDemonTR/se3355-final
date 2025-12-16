const defaultState = { 
	summary: '',
	generations: []
}

const data = (state = defaultState, action) => {
	const { payload, type } = action

	switch (type) {
		case 'SET_SUMMARY':
			return {
				...state,
				summary: payload
			}
		case 'SET_GENERATIONS':
			return {
				...state,
				generations: payload
			}
		
		default:
			return state
	}
}

export default data