import ws from './ws'
import { store } from 'store'

export default function logout() {
	ws?.disconnect()
	localStorage.removeItem('token')	
	store?.dispatch({ type: 'LOGOUT' })
}