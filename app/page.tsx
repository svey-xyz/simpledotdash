import { Edit } from "@components/Buttons"
import { Section as AppSection } from "@components/Apps/Section"

const Home = () => {
	// const session = useSession()

	// if (session.status !== 'authenticated') return <></>

	return (
		<div className="relative flex flex-col main-padding pb-24">
			<div className="relative flex flex-row items-center gap-4">
				<h2>Apps</h2>
			</div>
			<AppSection />
			<Edit />
		</div>
	)
}

export default Home