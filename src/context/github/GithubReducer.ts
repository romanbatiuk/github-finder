import { GithubState, IUserGitHub, IUserGitHubRepo } from '../../types/types'

export const GET_USERS = 'GET_USERS'
export const GET_REPOS = 'GET_REPOS'
export const SET_LOADING = 'SET_LOADING'
export const CLEAR_USERS = 'CLEAR_USERS'
export const GET_SINGLE_USER = 'GET_SINGLE_USER'

type GithubAction =
	| { type: typeof GET_USERS; payload: IUserGitHub[] }
	| { type: typeof GET_REPOS; payload: IUserGitHubRepo[] }
	| { type: typeof SET_LOADING }
	| { type: typeof CLEAR_USERS }
	| { type: typeof GET_SINGLE_USER; payload: IUserGitHub }

const githubReducer = (state: GithubState, action: GithubAction): GithubState => {
	switch (action.type) {
		case GET_USERS:
			return { ...state, users: action.payload, loading: false }
		case GET_REPOS:
			return { ...state, repos: action.payload, loading: false }
		case GET_SINGLE_USER:
			return { ...state, user: action.payload, loading: false }
		case SET_LOADING:
			return { ...state, loading: true }
		case CLEAR_USERS:
			return { ...state }
		default:
			return state
	}
}

export default githubReducer
