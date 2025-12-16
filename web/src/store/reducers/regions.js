const defaultState = []

const regions = (state = defaultState, action) => {
	const { payload, type } = action

	switch (type) {
		case 'REGIONS_PUSH': {
			const ids = [payload],
				filteredState = state.filter(x => !ids.includes(x.id)),
				combined = [...filteredState, ...payload]

				combined.sort((a, b) => a.id - b.id)

			return combined
		}

		case 'REGIONS_PUSH_MULTIPLE': {
			const ids = payload.map(x => x.id),
				filteredState = state.filter(x => !ids.includes(x.id)),
				combined = [...filteredState, ...payload]

				combined.sort((a, b) => a.id - b.id)

			return combined
		}

		case 'RESET': 
			return defaultState

		default:
			return state
	}
}

export default regions