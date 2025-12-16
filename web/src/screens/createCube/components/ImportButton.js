import { Button } from 'components'
import { Api } from 'lib'
import { parse } from 'papaparse'
import React, { useRef, useState } from 'react'

const ImportButton = ({ setCards }) => {
  const inputRef = useRef()

  async function submitFile(e) {
    const file = e.target.files[0]

    if(!file) return

    const parsed = parse(await file.text()),
      newCards = [],
      toImport = []

    for (const [id, name, type, count] of parsed.data) {
      for (let i = 0; i < count; i++) {
        newCards.push(id)
      }
      
      toImport.push(id)
    }

    const res = await Api.post('/card/getMultiple', { cards: toImport }, navigator)
    if(!res) return

    const mappedCards = newCards.map(x => (res[x]))

    setCards(cards => [...mappedCards, ...cards])
  }

  return (
    <React.Fragment>
      <input 
        type='file' 
        className='hidden' 
        accept='.csv'
        ref={inputRef} 
        onChange={submitFile} 
      />

      <Button
        text='Import CSV'
        onClick={() => inputRef.current.click()}
      />
    </React.Fragment>
  )
}

export default ImportButton