import React from 'react'
import { reduceClass, style } from 'lib'
import Box from 'components/common/Box'
import Text from 'components/common/Text'


const Footer = () => {

  return (
    <footer className={reduceClass(style.footer)}>
      <div className={reduceClass(style.footerInner)}>
        <Box>
          <Text col='text-pokeball-white' >
            Poyraz Sivrikaya - 2025 ©
          </Text>
          
          <Text col='text-pokeball-white' >
            Source code available on <a href='https://github.com/BlueDemonTR/se3355-final'>🔗Github</a>
          </Text>
        </Box>
        
        <Text col='text-pokeball-white' bold>
          Powered by <a href='https://ygoprodeck.com/api-guide/'>YGOPRODeck API</a>
        </Text>
      </div>
    </footer>
  )
}

export default Footer