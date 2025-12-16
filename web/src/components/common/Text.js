import { reduceClass, textColors } from 'lib'
import React, { useMemo } from 'react'

const Text = ({ 
  col = textColors.BLACK,
  size = 'text-base',
  bold = false,
  med = false,
  taCenter,
  italic,
  children
}) => {
  const classes = useMemo(generateClasses, [italic, col, size, bold, med, taCenter])

  function generateClasses() {
    const classes = [col, size]

    if(taCenter) classes.push('text-center')
    else classes.push('text-left')

    if(bold) classes.push('font-bold')
    else if(med) classes.push('font-medium')

    if(italic) classes.push('italic')

    return classes
  }

  return (
    <p
      className={reduceClass(classes)}
    >
      {children} {taCenter}
    </p>
  )
}

export default Text