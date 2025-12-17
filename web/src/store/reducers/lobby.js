const defaultState = {
	_id: null,
	owner: null,
	status: '',
	attendants: [],
	drafted: [],
	currentPack: [],
	draftSize: 60,
	maxLobbySize: 2,
	cardData: {}
}

const lobby = (state = defaultState, action) => {
	const { payload, type } = action

	switch (type) {
    case 'INITIAL_DATA':
      return { 
				_id: payload.lobby?._id ?? null, 
				attendants: payload.lobby?.attendants ?? [],
				drafted: payload.lobby?.drafted ?? [],
				currentPack: payload.lobby?.currentPack ?? [],
				owner: payload.lobby?.owner,
				maxLobbySize: payload.lobby?.maxLobbySize,
				status: payload.lobby?.status,
				draftSize: payload.lobby?.draftSize,
				cardData: payload.lobby?.cardData
			}

		case 'SET_LOBBY_DATA': 
      return { 
				_id: payload._id ?? null, 
				attendants: payload.attendants ?? [],
				drafted: payload.drafted ?? [],
				currentPack: payload.currentPack ?? [],
				owner: payload.owner,
				maxLobbySize: payload.maxLobbySize,
				status: payload.status,
				draftSize: payload.draftSize,
				cardData: payload.lobby?.cardData
			}
		
		case 'SET_CARD_DATA':
			return {
				...state,
				cardData: payload,
				status: 'drafting'
			}
		
		case 'SET_PACKS':
			return {
				...state,
				currentPack: payload
			}

		case 'LOBBY_JOIN':
			return {
				...state,
				attendants: [
					...state.attendants,
					payload
				]
			}

		case 'LOBBY_LEAVE':
			if(payload === state.owner) {
				alert('Draft owner left, closing down the cube')
				return defaultState
			}

			return {
				...state,
				attendants: state.attendants.filter(x => x._id !== payload)
			}

		case 'LOGOUT':
		case 'CLEAR_LOBBY_DATA':
		case 'RESET': 
			return defaultState

		default:
			return state
	}
}

export default lobby