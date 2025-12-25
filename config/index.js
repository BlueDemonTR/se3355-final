import { config } from 'dotenv'

config()

const env = {
  WS_PORT: parseInt(process.env.WS_PORT ?? '3000'),
  HTTP_PORT: parseInt(process.env.HTTP_PORT ?? '3001'),
  HTTPS_PORT: parseInt(process.env.HTTPS_PORT ?? '3002'),
  DB_URI: process.env.DB_URI ?? '',
  JWT_SECRET: process.env.JWT_SECRET ?? 'somethingrandom',
  VERSION: 'v0.1'
}

export default env
export { default as startDatabase } from './startDatabase'