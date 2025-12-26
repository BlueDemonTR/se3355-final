import { ContentArea, Text } from 'components'
import React, { useState } from 'react'

const Homepage = ({  }) => {
  
  return (
    <ContentArea>
      <Text>
        Since I don't currently have an SSL Certificate, for the browser to be able to connect to the server properly, you may first need to go to 
        {' '}<a 
          className='text-blue-700'
          href={process.env.REACT_APP_API_URL + '/test/redirectToHomepage'}
        >This Link</a>{' '}
        then press "Accept Risk and Continue" from the settings. I will try to fix this as soon as possible, sorry for the inconvenience.
      </Text>
    </ContentArea>
  )
}

export default Homepage