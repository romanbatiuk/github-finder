import { useEffect, useContext } from 'react'
// import axios from 'axios'
// import { IUserGitHub } from '../../types/types'
import Spinner from '../layout/Spinner'
import UserItem from './UserItem'
import GithubContext from '../../context/GithubContext'

const UserResults = (): JSX.Element => {
	// const [users, setUsers] = useState<IUserGitHub[]>([])
	// const [loading, setloading] = useState<boolean>(true)

	// const fetchUsers = async (): Promise<void> => {
	// 	try {
	// 		const { data } = await axios.get<IUserGitHub[]>(`${process.env.REACT_APP_GITHUB_URL}/users`, {
	// 			headers: { Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}` },
	// 		})
	// 		setUsers(data)
	// 		setloading(false)
	// 	} catch (err) {
	// 		console.log(err)
	// 	}
	// }

	// const { users, loading, fetchUsers } = useContext(GithubContext)
	const { users, loading } = useContext(GithubContext)

	useEffect(() => {
		// if (fetchUsers) {
		// 	fetchUsers()
		// }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (!loading) {
		return (
			<div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
				{users?.map((user) => (
					<UserItem user={user} key={user.id} />
				))}
			</div>
		)
	} else {
		return <Spinner />
	}
}

export default UserResults
