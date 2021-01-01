import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { employeeReducer } from './slices'

const rootReducer = combineReducers({ employee: employeeReducer })

export const store = configureStore({ reducer: rootReducer })
