import { AlertState } from '../../types/types'

export const SET_ALERT = 'SET_ALERT'
export const REMOVE_ALERT = 'REMOVE_ALERT'

type AlertAction =
	| { type: typeof SET_ALERT; payload: AlertState }
	| { type: typeof REMOVE_ALERT; payload: AlertState }

const alertReducer = (state: AlertState, action: AlertAction): AlertState => {
	switch (action.type) {
		case SET_ALERT:
			return action.payload
		case REMOVE_ALERT:
			return action.payload
		default:
			return state
	}
}

export default alertReducer
