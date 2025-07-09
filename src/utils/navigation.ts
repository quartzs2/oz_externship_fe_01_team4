import type { NavigateFunction } from 'react-router'

let navigateFunction: NavigateFunction | null = null

export const setGlobalNavigator = (navigate: NavigateFunction) => {
  navigateFunction = navigate
}

export const navigateToLogin = () => {
  if (navigateFunction) {
    navigateFunction('/')
  } else {
    console.error('Navigator not set. Cannot navigate to login.')
    window.location.href = '/login'
  }
}
