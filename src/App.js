import React, { useState } from 'react'
import {ReactComponent as ReactFirefly} from './firefly.svg'
import './App.css'



const App = () => {
  const [english, setEnglish] = useState({ text: '' })
  const [elvish, setElvish] = useState({ })
  const errorMsg = ['Uh uh too many tries, please try again later...', '(App allows 5 translations an hour and 60 times a day)']

  const handleChange = e => {
    const text = e.target.value
    setEnglish({ text })
    setElvish({})
  }

  const postData = () => {
    window.fetch(`https://api.funtranslations.com/translate/sindarin?text=${english.text}`)
      .then(res => res.json())
      .then(json => setElvish(json.contents))
      .catch(err => console.log(err))
      .catch(err => console.log(err))
  }

  const handleSubmit = e => {
    e.preventDefault()
    postData()
    // GERER LE CAS OU ON NE RECUPERE RIEN DE L API
    if (!elvish) {
      setEnglish({ text: '' })
      setElvish('')
      console.log(elvish)
    } else {
      setEnglish({ text: '' })
    }
  }

  return (
    <div className='App'>
      <h1>Elvish translator</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          id='text-area'
          name='text-area'
          rows='7'
          cols='60'
          maxLength='150'
          onChange={handleChange}
          value={english.text}
          placeholder='Text to translate here'
        />
        {/* FAIRE APPARAITRE LE BOUTON ET LES CHAR RESTANTS SI QQCH EST TAPE DS LE TEXT AREA */}
        {english.text.length >= 1 && (
          <>
            <div className='left-chars'>{150 - english.text.length}</div>
            <button type='submit'>Translate</button>
          </>
        )}
      </form>

      {/* FAIRE VARIER LA TAILLE DE LA POLICE ET LA MARGE SUPERIEURE EN FONCTION DE LA TAILLE DU TEXTE A TRADUIRE - A PEAUFINER */}
      {elvish
        ? (
          <div className={`translation ${english.text.length > 50 ? 'little' : 'big'}`}>
            {elvish.translated}
          </div>
          )
        : (
          <div className='errorMsg'>
            <p>{errorMsg[0]}</p>
            <p>{errorMsg[1]}</p>
          </div>
          )}
      <ReactFirefly />
    </div>
  )
}

export default App
