function isType(card, type) {
  if(card.typeline) {
    return card.typeline.includes(type)
  }

  return card.frameType === type.toLowerCase()
}

function isHighScale(card) {
  return card.scale && card.scale <= 6
}

function isLowScale(card) {
  return card.scale && card.scale > 6
}

const filters = {
  types: [
    { label: 'Normal', bg: 'bg-normal', filter: (item) => isType(item, 'Normal') },
    { label: 'Effect', bg: 'bg-effect', filter: (item) => isType(item, 'Effect') },
    { label: 'Spell', bg: 'bg-spell', filter: (item) => isType(item, 'Spell') },
    { label: 'Trap', bg: 'bg-trap', filter: (item) => isType(item, 'Trap') },
    { label: 'Ritual', bg: 'bg-ritual', filter: (item) => isType(item, 'Ritual') },
    { label: 'Fusion', bg: 'bg-fusion', filter: (item) => isType(item, 'Fusion') },
    { label: 'Synchro', bg: 'bg-synchro', filter: (item) => isType(item, 'Synchro') },
    { label: 'Xyz', bg: 'bg-xyz', filter: (item) => isType(item, 'Xyz'), whiteText: true },
    { label: 'Low Scale (<= 6)', bg: 'bg-low-scale', filter: isHighScale, whiteText: true },
    { label: 'High Scale (> 6)', bg: 'bg-high-scale', filter: isLowScale, whiteText: true },
    { label: 'Link', bg: 'bg-link', filter: (item) => isType(item, 'Link') },
  ]
}

export default filters