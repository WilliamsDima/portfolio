import ButtonSpace from "@atoms/ButtonSpace/ButtonSpace"
import { useNavigate } from "react-router-dom"
import styles from "./NotFoundPage.module.scss"

const NotFoundPage = () => {
	const navigation = useNavigate()

	const goMain = () => {
		navigation("/")
	}

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
