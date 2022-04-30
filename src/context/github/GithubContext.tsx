import axios from 'axios'
import React, { createContext, useReducer } from 'react'
import { GithubState, IUserGitHub, IUserGitHubRepo } from '../../types/types'
import githubReducer, {
	GET_USERS,
	SET_LOADING,
	CLEAR_USERS,
	GET_SINGLE_USER,
	GET_REPOS,
} from './GithubReducer'

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

export type GithubContextProps = {
	users: IUserGitHub[]
	repos: IUserGitHubRepo[]
	user: IUserGitHub
	loading: boolean
	searchUsers: (text: string) => void
	getUserRepos: (login: string) => void
	getUser: (login: string) => void
	clearUsers: () => void
}

type GetUsersResponse = {
	items: IUserGitHub[]
}

const GithubContext = createContext<GithubContextProps>({} as GithubContextProps)

export const GithubProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
	const initialState: GithubState = {
		users: [],
		repos: [],
		user: {} as IUserGitHub,
		loading: false,
	}

	const [state, dispatch] = useReducer(githubReducer, initialState)

	//! Get search results
	const searchUsers = async (text: string): Promise<void> => {
		try {
			const param = new URLSearchParams({ q: text })

			// Set loading
			dispatch({ type: SET_LOADING })

			const { data } = await axios.get<GetUsersResponse>(`${GITHUB_URL}/search/users?${param}`)

			dispatch({ type: GET_USERS, payload: data.items })
		} catch (err) {
			console.log(err)
		}
	}

	//! Get single user
	const getUser = async (login: string): Promise<void> => {
		try {
			// Set loading
			dispatch({ type: SET_LOADING })

			const response = await axios.get(`${GITHUB_URL}/users/${login}`)

			dispatch({ type: GET_SINGLE_USER, payload: response.data })
		} catch (err) {
			console.log(err)
		}
	}

	//! Get user repos
	const getUserRepos = async (login: string): Promise<void> => {
		try {
			const param = new URLSearchParams({ sort: 'updated', per_page: '10' })

			// Set loading
			dispatch({ type: SET_LOADING })

			const { data } = await axios.get(`${GITHUB_URL}/users/${login}/repos?${param}`)

			dispatch({ type: GET_REPOS, payload: data })
		} catch (err) {
			console.log(err)
		}
	}

	//! Clear users from state
	const clearUsers = (): void => {
		dispatch({ type: CLEAR_USERS })
	}

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				repos: state.repos,
				user: state.user,
				loading: state.loading,
				getUser,
				getUserRepos,
				searchUsers,
				clearUsers,
			}}
		>
			{children}
		</GithubContext.Provider>
	)
}

export default GithubContext
