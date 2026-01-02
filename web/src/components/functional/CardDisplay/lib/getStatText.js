function getStatText(atk, def) {
  
  if(!Number.isInteger(atk)) return ''

  let funcAtk = atk === -1 ? '?' : atk
  let funcDef = def === -1 ? '?' : def

  if(!Number.isInteger(def)) {
    return `${funcAtk} ATK`
  }



  return `${funcAtk}/${funcDef}`
}

export default getStatText