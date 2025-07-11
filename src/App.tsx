import Layout from '@components/layout/Layout'
import Courses from '@pages/courses/Courses'
import CourseDashboard from '@pages/courses/Dashboard'
import Generations from '@pages/courses/Generations'
import Subjects from '@pages/courses/Subjects'
import Login from '@pages/Login'
import Main from '@pages/Main'
import NotFound from '@pages/NotFound'
import Dashboard from '@pages/quizzes/Dashboard'
import Deployments from '@pages/quizzes/Deployments'
import Quizzes from '@pages/quizzes/Quizzes'
import Submissions from '@pages/quizzes/Submissions'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes, useNavigate } from 'react-router'
import './App.css'
import { setGlobalNavigator } from './utils/navigation'

const queryClient = new QueryClient()

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    setGlobalNavigator(navigate)
  }, [navigate])

  const ROUTES = [
    { element: <Main />, path: '/main' },
    // Quiz
    { element: <Quizzes />, path: '/quizzes' },
    { element: <Deployments />, path: '/quizzes/deployments' },
    { element: <Submissions />, path: '/quizzes/submissions' },
    { element: <Dashboard />, path: '/quizzes/dashboard' },
    // Course
    { element: <Courses />, path: '/courses' },
    { element: <Generations />, path: '/courses/generations' },
    { element: <Subjects />, path: '/courses/subjects' },
    { element: <CourseDashboard />, path: '/courses/CourseDashboard' },
    // Not Found
    { element: <NotFound />, path: '*' },
  ]

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route element={<Login />} path="/" />

          <Route element={<Layout />}>
            {ROUTES.map((route) => (
              <Route key={route.path} {...route} />
            ))}
          </Route>
        </Routes>

        <Toaster position="top-right" />
      </QueryClientProvider>{' '}
    </>
  )
}

export default App
