import { IAlert } from './AlertContext'

export const SET_ALERT = 'SET_ALERT'
export const REMOVE_ALERT = 'REMOVE_ALERT'

type AlertAction = { type: typeof SET_ALERT; payload: IAlert } | { type: typeof REMOVE_ALERT }

const alertReducer = (state: IAlert, action: AlertAction): IAlert => {
	switch (action.type) {
		case SET_ALERT:
			return action.payload
		case REMOVE_ALERT:
			return null
		default:
			return state
	}
}

export default alertReducer
