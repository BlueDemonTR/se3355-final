import axios from 'axios'
import { getToken } from './'
import { store } from '../store'
const API_URL = process.env.REACT_APP_API_URL

console.log('CONNECTING TO ' + API_URL)

// BUILD URL PROPS FOR GET AND DELETE REQUESTS
function buildURLParams(params) {
	if(!params || !Object.keys(params).length) return ''
	return '?' + new URLSearchParams(params).toString()
}

// SET HEADERS
const setHeaders = async () => {
	let token = getToken()

	if(token) {
		axios.defaults.headers.common = { 
			'Authorization': `Bearer ${token}`
		}
	}
}

function handleError(e) {
	console.log(e)
	
	if(e?.response?.data?.includes('Bad Gateway')) return

	store.dispatch({
		type: 'HANDLE_RES',
		payload: { err: e && e.response ? e.response.data : 'Something went wrong!' }
	})

	store.dispatch({ type: 'LOADING_BUTTON', payload: null })
}

// GLOBAL APIS
const Api = {
	async get(endpoint, params = {}, button) {
		await setHeaders()

		store.dispatch({
			type: 'LOADING_BUTTON',
			payload: button
		})

		const apiUrl = `${API_URL}${endpoint}${buildURLParams(params)}`

		try {
			const req = await axios.get(apiUrl)
			if(req.status === 202) {
				store.dispatch({ type: 'HANDLE_RES', payload: { res: req.data } })
				return true
			}

			store.dispatch({ type: 'LOADING_BUTTON', payload: null })

			return req.data
		} catch (e) {
			handleError(e)
			return false
		}
	},
	async post(endpoint, params, button) {
		await setHeaders()

		store.dispatch({
			type: 'LOADING_BUTTON',
			payload: button
		})

		try {
			const req = await axios.post(`${API_URL}${endpoint}`, params)
			store.dispatch({ type: 'LOADING_BUTTON', payload: null })
			if(req.status === 202) {
				store.dispatch({ type: 'HANDLE_RES', payload: { res: req.data } })
				return true
			}

			return req.data
		} catch (e) {
			handleError(e)
			return false
		}
	},
	async put(endpoint, params, button) {
		await setHeaders()

		store.dispatch({
			type: 'LOADING_BUTTON',
			payload: button
		})

		try {
			const req = await axios.put(`${API_URL}${endpoint}`, params)
			store.dispatch({ type: 'LOADING_BUTTON', payload: null })
			if(req.status === 202) {
				store.dispatch({ type: 'HANDLE_RES', payload: { res: req.data } })
				return true
			}

			store.dispatch({ type: 'LOADING_BUTTON', payload: null })
			return req.data
		} catch (e) {
			handleError(e)
			return false
		}
	},
	async patch(endpoint, params, button) {
		await setHeaders()

		store.dispatch({
			type: 'LOADING_BUTTON',
			payload: button
		})

		try {
			const req = await axios.patch(`${API_URL}${endpoint}`, params)
			store.dispatch({ type: 'LOADING_BUTTON', payload: null })

			if(req.status === 202) {
				store.dispatch({ type: 'HANDLE_RES', payload: { res: req.data } })
				return true
			}

			store.dispatch({ type: 'LOADING_BUTTON', payload: null })
			return req.data
		} catch (e) {
			handleError(e)
			return false
		}
	},
	async delete(endpoint, params, button) {
		await setHeaders()

		store.dispatch({
			type: 'LOADING_BUTTON',
			payload: button
		})

		const apiUrl = `${API_URL}${endpoint}${buildURLParams(params)}`

		try {
			const req = await axios.delete(apiUrl)
			store.dispatch({ type: 'LOADING_BUTTON', payload: null })

			if(req.status === 202) {
				store.dispatch({ type: 'HANDLE_RES', payload: { res: req.data } })
				return true
			}

			store.dispatch({ type: 'LOADING_BUTTON', payload: null })
			return req.data
		} catch (e) {
			handleError(e)
			return false
		}
	},
}

export default Api
