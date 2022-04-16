import { createContext, useReducer } from 'react'
import { AlertState } from '../../types/types'
import alertReducer, { SET_ALERT, REMOVE_ALERT } from './AlertReducer'

interface AlertContextProps {
	alert: AlertState
	setAlert: (message: string, type: string) => void
}

const AlertContext = createContext<AlertContextProps>({} as AlertContextProps)

export const AlertProvider = ({ children }: any): JSX.Element => {
	const initialState: AlertState = { message: '', type: '' }

	const [state, dispatch] = useReducer(alertReducer, initialState)

	// Set an alert
	const setAlert = (message: string, type: string): void => {
		dispatch({
			type: SET_ALERT,
			payload: { message, type },
		})

		setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: { message, type } }), 3000)
	}

	return (
		<AlertContext.Provider value={{ alert: state, setAlert }}>{children}</AlertContext.Provider>
	)
}

export default AlertContext
