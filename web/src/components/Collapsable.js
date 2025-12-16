import React, { useState } from 'react'
import { reduceClass, style, textColors } from 'lib'
import Text from './Text'
import Section from './Section'

const Collapsable = ({ title, content }) => {
  const [open, setOpen] = useState(false)

  return (
    <Section>
      <button
        className={reduceClass(style.collapsableTitle)}
        onClick={() => setOpen(!open)}
      >
        <Text col={textColors.WHITE} bold>
          {title}
        </Text>
      </button>

      <div className={reduceClass([
        ...style.collapsableContentWrapper,
        !open && 'h-0', 
      ])}>

        <div
          className={reduceClass([
            ...style.collapsableContent,
            open ? 'scale-y-100' : 'scale-y-0',
            open ? 'relative' : 'absolute',
          ])}
        >
          {content}
        </div>

        <div className={reduceClass(style.pokeballNub)} />

      </div>
    </Section>
  )
}

export default Collapsable