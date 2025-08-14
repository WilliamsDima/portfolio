import React from "react"
import styles from "./ModalPage.module.scss"
import { useActions } from "@hooks/useActions"
import { Modal } from "@atoms/Modal/Modal"
import { useAppSelector } from "@hooks/useStore"

const ModalPage = () => {
	const { setModalPage, setSelectedPlanet } = useActions()

	const { modalPage } = useAppSelector(store => store.app)

	const onClose = () => {
		setModalPage(null)
		setSelectedPlanet(null)
	}

	return (
		<Modal isOpen={!!modalPage} onClose={onClose}>
			<div className={styles.wrapper}>
				<div className={styles.content}>
					<button onClick={onClose}>Закрыть</button>
				</div>
			</div>
		</Modal>
	)
}

export default ModalPage
