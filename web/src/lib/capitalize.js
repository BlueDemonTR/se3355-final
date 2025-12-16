function capitalize(str) {
  const splitStr = str.toLowerCase().split(/[\s-_]+/),
    newStr = []

  for (const str of splitStr) {
    newStr.push(str.charAt(0).toUpperCase() + str.substring(1))
  }

  return newStr.join(' '); 
}

export default capitalize