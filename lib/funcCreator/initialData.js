import jwt from 'jsonwebtoken'
import { Lobby, User } from '../../models'
import config from '../../config'
import { getClientData } from '../lobbyUtils'

// GENERATE USER DATA FOR INITIAL LOGIN AND WS CONNECT EVENTS
async function initialData(io, userId) {
	const [user, lobby] = await Promise.all([
		User
			.findByIdAndUpdate(userId)
			.select('-password')
			.lean(),
		Lobby
			.findOne({ 'attendants.account': userId, status: { $ne: 'ended' } })
			.populate('attendants.account')
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

	if(lobby) {
		if(lobby.attendants.find(x => x.account._id.toString() === user._id.toString()).active) {
			final.lobby = await getClientData(lobby, user._id)
		}
	}

	io.to(userId).emit('INITIAL_DATA', final)

	return final
}

export default initialData
