import React, { createContext, useReducer } from 'react'
import alertReducer, { SET_ALERT, REMOVE_ALERT } from './AlertReducer'

export type IAlert = {
	msg: string
	type: string
} | null

export type AlertContextProps = {
	alert: IAlert
	setAlert: (msg: string, type: string) => void
}

const AlertContext = createContext<AlertContextProps>({} as AlertContextProps)

export const AlertProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
	const initialState: IAlert = null

	const [state, dispatch] = useReducer(alertReducer, initialState)

	// Set Alert
	const setAlert = (msg: string, type: string): void => {
		dispatch({
			type: SET_ALERT,
			payload: { msg, type },
		})
	}

	setTimeout(() => dispatch({ type: REMOVE_ALERT }), 3000)

	return (
		<AlertContext.Provider value={{ alert: state, setAlert }}>{children}</AlertContext.Provider>
	)
}

export default AlertContext
