import type { UnknownAction } from '@reduxjs/toolkit'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { resetApp } from './app-actions'
import fertilityReducer from './fertility-slice'

const FERTILITY_STORAGE_KEY = 'fertility_cycles'

const appReducer = combineReducers({
  fertility: fertilityReducer,
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

store.subscribe(() => {
  try {
    localStorage.setItem(
      FERTILITY_STORAGE_KEY,
      JSON.stringify(store.getState().fertility.entries),
    )
  } catch {
    // ignore storage errors
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
