import { reduceClass, style } from 'lib'
import React from 'react'

const ContentArea = ({ children }) => {

  return (
    <div className={reduceClass(style.contentWrapper)}>
      <div className={reduceClass(style.contentArea)}>
        {children}
      </div>
    </div>
  )
}

export default ContentArea