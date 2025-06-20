import './App.css'

import { Routes, Route } from 'react-router'

import Layout from '@components/Layout'
import Main from '@pages/Main'
import NotFound from '@pages/NotFound'

function App() {
  const ROUTES = [
    { element: <Main />, path: '/' },
    { element: <NotFound />, path: '*' },
  ]

  return (
    <Routes>
      <Route element={<Layout />}>
        {ROUTES.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Route>
    </Routes>
  )
}

export default App
