import React, { useEffect, useState } from "react"
import styles from "./ModalPage.module.scss"
import { useActions } from "@hooks/useActions"
import { Modal } from "@atoms/Modal/Modal"
import { useAppSelector } from "@hooks/useStore"
import { animate, AnimatePresence, motion, useMotionValue } from "framer-motion"
import { Terminal } from "@atoms/Terminal/Terminal"

const ModalPage = () => {
	const { setModalPage, setSelectedPlanet } = useActions()

	const { modalPage } = useAppSelector(store => store.app)

	const text = "Привет! Я — твое имя."
	const [displayedChars, setDisplayedChars] = useState(0)

	const onClose = () => {
		setModalPage(null)
		setSelectedPlanet(null)
		setDisplayedChars(0)
	}

	const cursorX = useMotionValue(0)

	useEffect(() => {
		let i = 0
		const interval = setInterval(() => {
			if (i < text.length) {
				setDisplayedChars(i + 1)

				animate(cursorX, 0, { type: "spring", stiffness: 300 })

				i++
			} else {
				clearInterval(interval)
			}
		}, 100) // скорость печати
		return () => clearInterval(interval)
	}, [text, cursorX, modalPage])

	return (
		<Modal isOpen={!!modalPage} onClose={onClose}>
			<div className={styles.wrapper}>
				<div className={styles.content}>
					<Terminal onClose={onClose}>
						<AnimatePresence mode='wait'>
							{modalPage && (
								<div className={styles.textBlock}>
									<span>{text.slice(0, displayedChars)}</span>
									<motion.span
										className={styles.terminal_cursor}
										style={{ x: cursorX }}
									/>
								</div>
							)}
						</AnimatePresence>
					</Terminal>
				</div>
			</div>
		</Modal>
	)
}

export default ModalPage
