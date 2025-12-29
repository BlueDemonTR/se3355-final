import { ContentArea, Hypertext, Section, Text } from 'components'
import { reduceClass } from 'lib'
import React, { useState } from 'react'

const Homepage = ({  }) => {
  
  return (
    <ContentArea>
      <div
        className={reduceClass([
          'border-2',
          'border-red-900',
          'bg-red-500',
          'border-solid',
          'p-4',
          'rounded-2xl'
        ])}
      >
        
        <Text>
          Since I don't currently have an SSL Certificate, for the browser to be able to connect to the server properly, you may first need to go to 
          {' '}<a
            className='text-blue-700'
            href={process.env.REACT_APP_API_URL + '/test/redirectToHomepage'}
          >This Link</a>{' '}
          then press "Accept Risk and Continue" from the settings. I will try to fix this as soon as possible, sorry for the inconvenience.
        </Text>
      </div>

      <Section>
        <Text>
          Welcome to Poyoraz Draft! From the navigation at the top you can view cubes and cards. If you have logged in, you can also create cubes, create and join lobbies.
        </Text>
        <Text>
          During the draft feel free to refresh the app as much as you want to, your drafts will persist even a server crash.
        </Text>
      </Section>
    </ContentArea>
  )
}

export default Homepage