import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import PokemonPage from './Pages/PokemonPage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<PokemonPage />}>
        <Route path=':id'
          element={<PokemonPage />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
export default App
