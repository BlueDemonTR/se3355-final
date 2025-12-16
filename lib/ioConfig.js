import socketioJwt from 'socketio-jwt'
import { User } from '../models'
import env from '../config'

// A USER CONNECTS TO WS
async function handleUserConnection(socket, io, functions) {
	const { id } = socket.decoded_token

	// JOIN TO SOCKET
	socket.join(id)

	// CHECK IF USER EXISTS, OTHERWISE FORCE LOGOUT
	const data = await functions.initialData(io, id)
	if(!data) {
		io.to(id).emit('FORCE_LOGOUT')
		socket.disconnect()
		console.log('USER NOT FOUND ON WS CONNECT', id)
		return false
	}

	return true
}

// A USER HAS DISCONNECTED FROM WS
async function handleUserDisconnection(socket, io, functions) {
	const { id } = socket.decoded_token

	functions.disconnect(io, id)
	io.to(id).emit('USER_CONNECTED', { id, online: false })
}


function ioConfig(io, functions) {
	io.use(
		socketioJwt.authorize({
			secret: env.JWT_SECRET,
			handshake: true
		})
	)

	// FIRES WHEN A USER IS CONNECTED
	// HAPPENS ONCE AFTER USER AUTHENTICATES (LOGIN)
	io.on('connection', async (socket) => {
		const { id, email } = socket.decoded_token
		// CHECK IF USER EXISTS, OTHERWISE FORCE LOGOUT
		const user = await User.findById(id).select('_id')
		if(!user) {
			io.to(id).emit('FORCE_LOGOUT')
			socket.disconnect()
			return console.log('USER', id, email)
		}

		// CHECK IF THE CONNECTION SUCCESSFUL
		const connectionSuccess = await handleUserConnection(socket, io, functions)

		// CONNECTION NOT SUCCESFUL. RETURN
		if(!connectionSuccess) return

		socket.on('connect_error', (err) => {
			console.log(`connect_error due to ${err.message}`)
		})

		socket.on('disconnect', async (reason) => {
			await handleUserDisconnection(socket, io, functions)
		})

		// HANDLE MESSAGES SENT FROM CLIENTS.
		// CHECK lib/funcCreator FOR FUNCTION REFERENCES
		socket.on('message', (type, data) => {
			if(!functions[type]) return console.log('NO FUNCTION', type)

			functions[type](io, id, data, socket)
		})
	})
}

export default ioConfig
