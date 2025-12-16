import jwt from 'jsonwebtoken'
import { User } from '../../models'
import config from '../../config'

// GENERATE USER DATA FOR INITIAL LOGIN AND WS CONNECT EVENTS
async function initialData(io, userId) {
	const [user, listings, chats] = await Promise.all([
		User
			.findByIdAndUpdate(userId)
			.select('-password')
			.lean(),
	])

	if(!user) {
		io.to(userId).emit('LOGOUT', true)
		return
	}

	const tokenData = { id: user._id },
		// CREATE A REFRESHED TOKEN SO IT DOESN'T EXPIRE
		token = jwt.sign(tokenData, config.JWT_SECRET, { expiresIn: '14d' })

	// SEND TOKEN, USER AND RELATED DATA
	const final = {
		user,
		token,
	}

	io.to(userId).emit('INITIAL_DATA', final)

	return final
}

export default initialData
