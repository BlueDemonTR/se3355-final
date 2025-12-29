import { Authority } from '../../lib'
import { getClientData } from '../../lib/lobbyUtils'
import { Lobby } from '../../models'

const docs = {
  method: 'post',
  action,
  description: 'Creates a lobby',
  authorized: Authority.USER
}

async function action(req, res) {
  const {
      name,
      passcode,
      cubeId,
      maxLobbySize,
      packSize,
      draftSize
    } = req.body,
    { user } = req

  const lobby = await Lobby.create({
    name, 
    passcode,
    cube: cubeId,
    maxLobbySize,
    packSize,
    draftSize,
    public: !passcode.length,
    owner: user,
    attendants: [{ account: user }]
  })

  await lobby.populate('attendants.account', 'username')

  res.send(await getClientData(lobby, user._id))
}

export default docs
