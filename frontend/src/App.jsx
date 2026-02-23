import React from 'react'
import FacialExpression from './components/FacialExpression'
import SongTracks from './components/SongTracks'
import { useState } from 'react'

import './App.css'

const App = () => {

  const [songs, setSongs] = useState([])
  return (
    <>
      <h2>Real-Time Emotion Detection</h2>
      <div className="main">
        <FacialExpression setSongs={setSongs} />
        <SongTracks songs={songs} />
      </div>
    </>
  )
}

export default App