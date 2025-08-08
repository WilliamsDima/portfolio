import Layout from "@templates/Layout/Layout"
import "./MainPage.scss"

const MainPage = () => {
	return (
		<Layout>
			<section className='section intro'>Приветствие</section>
			<section className='section about'>О себе</section>
			<section className='section skills'>Скиллы</section>
		</Layout>
	)
}

export default MainPage
