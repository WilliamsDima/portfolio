import ButtonSpace from "@atoms/ButtonSpace/ButtonSpace"
import { useNavigate } from "react-router-dom"

const NotFoundPage = () => {
	const navigation = useNavigate()

	const goMain = () => {
		navigation("/")
	}

	return (
		<div>
			<ButtonSpace onClick={goMain} />
		</div>
	)
}

export default NotFoundPage
