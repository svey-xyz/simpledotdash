import { Edit } from "@components/Buttons"
import { AppsSection } from "@components/Tiles/AppsSection"

const Home = () => {
	// const session = useSession()

	// if (session.status !== 'authenticated') return <></>

	return (
		<div className="relative flex flex-col main-padding pb-24">
			<div className="relative flex flex-row items-center gap-4">
				<h2>Apps</h2>
			</div>
			<AppsSection />
			<Edit />
		</div>
	)
}

export default Home