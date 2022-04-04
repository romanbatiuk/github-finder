import { IUserGitHub } from '../types/types'

export const GET_USERS = 'GET_USERS'
export const SET_LOADING = 'SET_LOADING'

interface UserState {
	users?: IUserGitHub[]
	loading: boolean
}

interface githubAction {
	type: string
	payload?: IUserGitHub[]
}

const initialState: UserState = {
	users: [],
	loading: true,
}

const githubReducer = (state = initialState, action: githubAction): UserState => {
	switch (action.type) {
		case GET_USERS:
			return { ...state, users: action.payload, loading: false }
		case SET_LOADING:
			return { ...state, loading: true }
		default:
			return state
	}
}

export default githubReducer
