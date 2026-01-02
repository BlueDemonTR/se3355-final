import { ContentArea, Hypertext, Section, Text } from 'components'
import { reduceClass } from 'lib'
import React, { useState } from 'react'

const Homepage = ({  }) => {
  
  return (
    <ContentArea>
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