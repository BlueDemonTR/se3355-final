import React from 'react'

const FullScreenLoading = () => {

  return (
    <div
      className='fixed w-screen h-screen bg-black/30 flex items-center justify-center z-50 animate-fadeIn'
    >
      <img 
        src={require('assets/poyocube.png')} 
        alt='pokeball' 
        className='animate-spin w-24 h-24'
      />
      
    </div>
  )
}

export default FullScreenLoading