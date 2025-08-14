import Layout from "@templates/Layout/Layout"
import "./MainPage.scss"
import SolarSystem from "@organisms/SolarSystem/SolarSystem"
import ModalPage from "@molecules/ModalPage/ModalPage"

const MainPage = () => {
	return (
		<Layout>
			<SolarSystem />
			<ModalPage />
		</Layout>
	)
}

export default MainPage
