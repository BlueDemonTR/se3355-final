import { User } from '../../models'

async function disconnect(io, userId) {
	const data = {
		online: false,
	}
	await User.findByIdAndUpdate(userId, data)

	io.to(userId).emit('EDIT_USER', { _id: userId, ...data })
}

export default disconnect
