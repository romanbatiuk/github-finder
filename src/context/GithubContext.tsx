import axios from 'axios'
import { createContext, useReducer, PropsWithChildren } from 'react'
import { IUserGitHub } from '../types/types'
import githubReducer, { GET_USERS, SET_LOADING, CLEAR_USERS } from './GithubReducer'

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export interface IGithubContext {
	users: IUserGitHub[] | undefined
	loading: boolean
	searchUsers?: (text: string) => void
	clearUsers?: () => void
}

type GetUsersResponse = {
	items: IUserGitHub[]
}

const GithubContext = createContext<IGithubContext>({ users: [], loading: true })

export const GithubContextProvider = ({
	children,
}: PropsWithChildren<IGithubContext>): JSX.Element => {
	const initialState = {
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
