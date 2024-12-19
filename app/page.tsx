import { SessionChecker } from "@components/User/SessionChecker"
import { _PROVIDERS } from "@lib/auth"

const Home = () => {
	const providers = _PROVIDERS.flatMap((provider) => {
		return {
			name: provider.name,
			id: provider.id
		}
	})
	
	return (
		<div className="relative flex flex-col main-padding pb-24">
			<SessionChecker providers={providers}/>
		</div>
	)
}

export default Home