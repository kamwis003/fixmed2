import type { UnknownAction } from '@reduxjs/toolkit'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { resetApp } from './app-actions'

const appReducer = combineReducers({
  // Add your reducers here
})

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: UnknownAction,
) => {
  if (resetApp.match(action)) {
    return (appReducer as any)(undefined, action)
  }
  return (appReducer as any)(state, action)
}

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
