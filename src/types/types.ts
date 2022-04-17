export interface IUserGitHub {
	id: number
	login: string
	avatar_url: string
	html_url: string
	public_repos: string
	public_gists: string
	followers: string
	following: string
	type: string
	location: string
	twitter_username: string
}

export interface GithubState {
	users: IUserGitHub[]
	loading: boolean
}
