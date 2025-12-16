import { reduceClass } from 'lib'
import React, { useMemo } from 'react'

const Box = ({ 
  element = 'div',
  children, 
  vertical, 
  noFlex, 
  relative, 
  fullW, 
  fullH, 
  justifyBetween, 
  justifyCenter,
  justifyAround,
  grow,
  directionSwap,
  webHidden,
  mobileHidden,
  alignCenter,
  gap = 'gap-0'
}) => {
  const classes = useMemo(generateClasses, [gap, vertical, noFlex, directionSwap, webHidden, mobileHidden, relative, fullW, fullH, justifyBetween, grow, alignCenter, justifyCenter, justifyAround])
    
  
  function generateClasses() {
    const classes = ['flex', gap]

    classes.push(vertical ? 'flex-row' : 'flex-col')
    classes.push(noFlex ? 'flex-none' : 'flex-1')

    if(relative) classes.push('relative')
    if(fullW) classes.push('w-full')
    if(fullH) classes.push('h-full')

    if(justifyBetween) classes.push('justify-between')
    else if (justifyCenter) classes.push('justify-center') 
    else if (justifyAround) classes.push('justify-around') 

    if(grow) classes.push('grow')

    if(alignCenter) classes.push('items-center')

    if(directionSwap) classes.push(vertical ? 'md:flex-col' : 'md:flex-row')
    
    if(webHidden) classes.push('md:hidden')
    if(mobileHidden) classes.push('hidden', 'md:flex')

    return classes
  }

  const ElementItem = element

  return (
    <ElementItem
      className={reduceClass(classes)}
    >
      { children }
    </ElementItem>
  )
}

export default Box