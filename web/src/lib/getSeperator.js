function getSeperator(index, length, normalSeperator = ', ', penultimateSeperator = ' and ', ender = '.') {
  if(index === length - 1) return ender
  if(index === length - 2) return penultimateSeperator
  return normalSeperator
}

export default getSeperator