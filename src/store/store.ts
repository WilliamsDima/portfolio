import { configureStore, combineReducers } from "@reduxjs/toolkit"

import appReducer from "./slice/appSlice"
import { setupListeners } from "@reduxjs/toolkit/query"

const rootReducer = combineReducers({
	app: appReducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false, // отключаем проверку сериализуемости
		}),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
