import { Authority } from '../../lib'

const docs = {
  method: 'get',
  action,
  description: '(TEMPORARY) Send the user back to the homepage',
  authorized: Authority.NONE
}

async function action(req, res) {
  res
    .redirect('https://bluedemontr.github.io/se3355-final/')
}

export default docs
