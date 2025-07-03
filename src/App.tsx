import { Toaster } from 'react-hot-toast'
import './App.css'

import { Route, Routes } from 'react-router'

import Layout from '@components/layout/Layout'
import Login from '@pages/Login'
import Main from '@pages/Main'
import NotFound from '@pages/NotFound'
import Dashboard from '@pages/quizzes/Dashboard'
import Deployments from '@pages/quizzes/Deployments'
import Quizzes from '@pages/quizzes/Quizzes'
import Submissions from '@pages/quizzes/Submissions'

function App() {
  const ROUTES = [
    { element: <Main />, path: '/main' },
    // Quiz
    { element: <Quizzes />, path: '/quizzes' },
    { element: <Deployments />, path: '/quizzes/deployments' },
    { element: <Submissions />, path: '/quizzes/submissions' },
    { element: <Dashboard />, path: '/quizzes/dashboard' },
    // Not Found
    { element: <NotFound />, path: '*' },
  ]

  return (
    <>
      <Routes>
        <Route element={<Login />} path="/" />

        <Route element={<Layout />}>
          {ROUTES.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Route>
      </Routes>

      <Toaster position="top-right" />
    </>
  )
}

export default App
