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
  }
}

export const navigateTo = (path: string) => {
  if (navigateFunction) {
    navigateFunction(path)
  } else {
    console.error('Navigator not set. Cannot navigate to:', path)
  }
}
