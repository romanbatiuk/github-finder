import { GithubState, IUserGitHub } from '../../types/types'

export const GET_USERS = 'GET_USERS'
export const SET_LOADING = 'SET_LOADING'
export const CLEAR_USERS = 'CLEAR_USERS'

type GithubAction =
	| { type: typeof GET_USERS; payload: IUserGitHub[] }
	| { type: typeof SET_LOADING }
	| { type: typeof CLEAR_USERS }

const githubReducer = (state: GithubState, action: GithubAction): GithubState => {
	switch (action.type) {
		case GET_USERS:
			return { ...state, users: action.payload, loading: false }
		case SET_LOADING:
			return { ...state, loading: true }
		case CLEAR_USERS:
			return { ...state }
		default:
			return state
	}
}

export default githubReducer
