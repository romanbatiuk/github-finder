import { useState, ChangeEvent, FormEvent, useContext } from 'react'
import GithubContext from '../../context/GithubContext'
import AlertContext from '../../context/alert/AlertContext'

const UserSearch = (): JSX.Element => {
	const [text, setText] = useState('')

	const { users, searchUsers, clearUsers } = useContext(GithubContext)

	const { setAlert } = useContext(AlertContext)

	const handleChange = (e: ChangeEvent<HTMLInputElement>): void => setText(e.target.value)

	const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault()
		if (text === '') {
			// alert('Please enter something')
			setAlert && setAlert('Please enter something', 'error')
		} else {
			// @todo - search users
			searchUsers && searchUsers(text)
			setText('')
		}
	}

	return (
		<div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
			<div>
				<form onSubmit={handleSubmit}>
					<div className="form-control">
						<div className="relative">
							<input
								type="text"
								className="w-full pr-40 bg-gray-200 input input-lg text-black"
								placeholder="Search"
								value={text}
								onChange={handleChange}
							/>
							<button
								type="submit"
								className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
							>
								Go
							</button>
						</div>
					</div>
				</form>
			</div>
			{users && users?.length > 0 && (
				<div>
					<button className="btn btn-ghost btn-lg" onClick={clearUsers}>
						Clear
					</button>
				</div>
			)}
		</div>
	)
}

export default UserSearch
