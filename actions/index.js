import { routeCreator } from '../lib'

let cached = null

async function getRoutes() {
  if(cached) return cached

  cached = await routeCreator(__dirname, '.js', true)
  console.log(`Imported ${cached.size} actions.`)

  return cached
}

export default getRoutes