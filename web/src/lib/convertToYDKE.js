import { Buffer } from 'buffer'

function passcodesToBase64(passcodes) {
  return Buffer.from(new Uint8Array(passcodes.buffer)).toString("base64")
}

function convertToYDKE(deck) {
  return 'ydke://' +
      passcodesToBase64(deck.main) + '!' +
      passcodesToBase64(deck.extra) + '!' +
      passcodesToBase64(deck.side) + '!'
  
}

export default convertToYDKE