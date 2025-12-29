const defaultState = {
	dark: true,
	loadingButton: null,
	errRes: {},
	version: '1.0',
	selectedCard: null,
	cardData: null
}

const appState = (state = defaultState, action) => {
	const { payload, type } = action

	switch (type) {
		case 'SET_ONBOARDED':
			return {
				...state,
				onboarded: payload
			}

		case 'RESET_APP_STATE': 
			return {
				...defaultState,
				errRes: {},
				dark: true
			}

		case 'SELECT_CARD':
			
			return {
				...state,
				selectedCard: payload,
				cardData: state.selectedCard?.id === payload.id
					? state.cardData
					:	null
			}

		case 'SET_CARD_DATA':
			if(state.selectedCard?.id !== payload.id) return state

			return {
				...state,
				cardData: payload,
			}

		case 'LOADING_BUTTON': 
			return {
				...state,
				loadingButton: payload
			}

		case 'HANDLE_RES':
			return {
				...state,
				errRes: {
					err: payload.err ? payload.err : null,
					res: payload.res ? payload.res : null
				}
			}

		default:
			return state
	}
}

export default appState