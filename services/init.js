import axios from 'axios'
import { Api, routeCreator } from '../lib'
import fs from 'fs'
import { User } from '../models'

async function init() {
  const admin = await User.findOne({ isAdmin: true })
  if(!admin) {
    const newAdmin = new User({ 
      username: 'admin'
    })

    newAdmin.password = newAdmin.generateHash(process.env.ADMIN_PASSWORD)

    await newAdmin.save()

    console.log('---------------------------------------------------------------------------------')
    console.warn('NEW ADMIN ACCOUNT GENERATED')
    console.log('---------------------------------------------------------------------------------')
  }


  const exists = await routeCreator('./public/images', '.jpg', true)

  const res = await Api.get('https://db.ygoprodeck.com/api/v7/cardinfo.php')
  if(!res) return

  const ids = res.data.reduce((prev, curr) => {
    return [...prev, ...curr.card_images]
  }, [])

  let count = 0
  for (const { id, image_url_small: image } of ids) {
    count++
    
    if(exists.has(id.toString())) continue

    const img = await axios({
      url: image,
      responseType: 'stream',
    })

    await img.data.pipe(fs.createWriteStream(`./public/images/${id}.jpg`))
      .on('finish', () => console.log(`Successful ${count}/${ids.length}`))
      .on('error', e => console.warn(e))
    
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
}

export default init