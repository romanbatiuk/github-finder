import { FC } from 'react'
import { IUserGitHubRepo } from '../../types/types'
import RepoItem from './RepoItem'

interface RepoListProps {
	repos: IUserGitHubRepo[]
}

const RepoList: FC<RepoListProps> = ({ repos }): JSX.Element => {
	return (
		<div className="rounded-lg shadow-lg card bg-base-100">
			<div className="card-body">
				<h2 className="text-3xl my-4 font-bold card-title">Latest Repositories</h2>
				{repos.map((repo) => (
					<RepoItem key={repo.id} repo={repo} />
				))}
			</div>
		</div>
	)
}

export default RepoList
