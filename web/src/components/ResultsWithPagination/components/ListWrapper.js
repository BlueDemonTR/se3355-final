import React from 'react'
import { reduceClass, style } from 'lib'

const ListWrapper = ({ children }) => {

  return (
    <section className={reduceClass(style.listWrapper)}>
      {children}
    </section>
  )
}

export default ListWrapper