import axios from 'axios'
import { createContext, useState, PropsWithChildren } from 'react'
import { IUserGitHub } from '../types/types'

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export interface IGithubContext {
	users: IUserGitHub[]
	loading: boolean
	fetchUsers?: () => void
}

const GithubContext = createContext<IGithubContext>({ users: [], loading: true })

export const GithubContextProvider = ({
	children,
}: PropsWithChildren<IGithubContext>): JSX.Element => {
	const [users, setUsers] = useState<IUserGitHub[]>([])
	const [loading, setloading] = useState<boolean>(true)

	const fetchUsers = async (): Promise<void> => {
		try {
			const { data } = await axios.get<IUserGitHub[]>(`${GITHUB_URL}/users`, {
				headers: { Authorization: `token ${GITHUB_TOKEN}` },
			})
			setUsers(data)
			setloading(false)
		} catch (err) {
			console.log(err)
		}
	}
	return (
		<GithubContext.Provider value={{ users, loading, fetchUsers }}>
			{children}
		</GithubContext.Provider>
	)
}

export default GithubContext
