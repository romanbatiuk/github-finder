import axios from 'axios'
import { createContext, useReducer, PropsWithChildren } from 'react'
import { IUserGitHub } from '../types/types'
import githubReducer, { GET_USERS, SET_LOADING } from './GithubReducer'

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export interface IGithubContext {
	users: IUserGitHub[] | undefined
	loading: boolean
	fetchUsers?: () => void
}

const GithubContext = createContext<IGithubContext>({ users: [], loading: true })

export const GithubContextProvider = ({
	children,
}: PropsWithChildren<IGithubContext>): JSX.Element => {
	// const [users, setUsers] = useState<IUserGitHub[]>([])
	// const [loading, setloading] = useState<boolean>(true)

	const initialState = {
		users: [],
		loading: false,
	}

	const [state, dispatch] = useReducer(githubReducer, initialState)

	const fetchUsers = async (): Promise<void> => {
		try {
			// Set loading
			dispatch({ type: SET_LOADING })

			const { data } = await axios.get<IUserGitHub[]>(`${GITHUB_URL}/users`, {
				headers: { Authorization: `token ${GITHUB_TOKEN}` },
			})
			// setUsers(data)
			// setloading(false)

			dispatch({ type: GET_USERS, payload: data })
		} catch (err) {
			console.log(err)
		}
	}
	return (
		<GithubContext.Provider value={{ users: state.users, loading: state.loading, fetchUsers }}>
			{children}
		</GithubContext.Provider>
	)
}

export default GithubContext
