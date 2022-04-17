import axios from 'axios'
import React, { createContext, useReducer } from 'react'
import { GithubState, IUserGitHub } from '../../types/types'
import githubReducer, { GET_USERS, SET_LOADING, CLEAR_USERS } from './GithubReducer'

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export type GithubContextProps = {
	users: IUserGitHub[]
	loading: boolean
	searchUsers: (text: string) => void
	clearUsers: () => void
}

type GetUsersResponse = {
	items: IUserGitHub[]
}

const GithubContext = createContext<GithubContextProps>({} as GithubContextProps)

export const GithubProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
	const initialState: GithubState = {
		users: [],
		loading: false,
	}

	const [state, dispatch] = useReducer(githubReducer, initialState)

	//! Get search results
	const searchUsers = async (text: string): Promise<void> => {
		try {
			const param = new URLSearchParams({ q: text })

			// Set loading
			dispatch({ type: SET_LOADING })

			const { data } = await axios.get<GetUsersResponse>(`${GITHUB_URL}/search/users?${param}`, {
				headers: { Authorization: `token ${GITHUB_TOKEN}` },
			})

			dispatch({ type: GET_USERS, payload: data.items })
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
			value={{ users: state.users, loading: state.loading, searchUsers, clearUsers }}
		>
			{children}
		</GithubContext.Provider>
	)
}

export default GithubContext
