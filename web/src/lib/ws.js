import io from 'socket.io-client'
import { getToken, logout } from './'
import { store } from '../store'
const API_URL = process.env.REACT_APP_WS_URL

let socket, timer

function send(msg, payload) {
	socket?.send(msg, payload)
}

function connect() {
	if(socket) return console.log('TRIED TO CONNECT TO WS')

	const token = getToken()
	if(!token) {
		store.dispatch({
			type: 'LOGOUT',
			payload: null
		})
		return
	}

	socket = io(API_URL, {
		query: { token }
	})

	socket.on('connect', () => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			store.dispatch({
				type: 'CONNECTED',
				payload: true
			})
		}, 1000)
	})

	socket.onAny((event, args) => {
		// console.log('---------------------------------------------------------------------------------')
		// console.log('WS EVENT', event, args)
		// console.log('---------------------------------------------------------------------------------')

		store.dispatch({
			type: event,
			payload: args
		})

		if(event === 'INITIAL_DATA') {
			localStorage.setItem('token', args.token)
		}

		if(event === 'FORCE_LOGOUT') {
			logout()
		}
	})

	socket.on('disconnect', (reason) => {
		clearTimeout(timer)
		store.dispatch({
			type: 'CONNECTED',
			payload: false
		})
	})
}

function disconnect() {
	socket?.disconnect()
	socket = undefined
}

const ws = {
	connect,
	send,
	disconnect
}

export default ws