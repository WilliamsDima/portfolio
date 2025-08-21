import ButtonSpace from "@atoms/ButtonSpace/ButtonSpace"
import { useLocation, useNavigate } from "react-router-dom"
import styles from "./NotFoundPage.module.scss"
import { useEffect } from "react"
import { useActions } from "@hooks/useActions"

const NotFoundPage = () => {
	const { setThreeJsIsLoad } = useActions()
	const navigation = useNavigate()

	const location = useLocation()

	const goMain = () => {
		setThreeJsIsLoad(true)
		navigation("/")
	}

	useEffect(() => {
		const isHome = location.pathname === "/"

		setThreeJsIsLoad(isHome)
	}, [location])

	return (
		<div className={styles.page}>
			<div className={styles.card}>
				<img
					src='https://uiverse.io/astronaut.png'
					alt=''
					className={styles.image}
				/>
				<div className={styles.heading}>404 Error</div>

				<ButtonSpace onClick={goMain} />
			</div>
		</div>
	)
}

export default NotFoundPage
