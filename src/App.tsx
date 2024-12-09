import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {FontIdentification, TextIdentification, MainPage} from './Pages/main'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Text-Identificator" element={<TextIdentification />} />
        <Route path="/Font-Identificator" element={<FontIdentification />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;