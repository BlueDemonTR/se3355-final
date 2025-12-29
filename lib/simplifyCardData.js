function simplifyCardData(item) {
  const { 
    id, 
    name, 
    typeline, 
    type, 
    humanReadableCardType, 
    frameType, 
    desc, 
    race, 
    atk, 
    def, 
    level, 
    scale, 
    attribute, 
    archetype, 
    ygoprodeck_url,
    linkval,
    linkmarkers,
    pend_desc,
    monster_desc,
    banlist_info
  } = item
  
  return { 
    id, 
    name, 
    typeline, 
    type, 
    humanReadableCardType, 
    frameType, 
    desc, 
    race, 
    atk, 
    def, 
    level, 
    scale, 
    attribute, 
    archetype, 
    ygoprodeck_url,
    linkval,
    linkmarkers,
    pend_desc,
    monster_desc,
    banlist_info
  }
}

export default simplifyCardData