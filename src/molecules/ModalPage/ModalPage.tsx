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
	const cursorX = useMotionValue(0)

	const onClose = () => {
		setModalPage(null)
		setSelectedPlanet(null)
		setDisplayedChars(0)
	}

	useEffect(() => {
		if (!modalPage) return
		let i = 0
		const interval = setInterval(() => {
			if (i < text.length) {
				setDisplayedChars(i + 1)
				animate(cursorX, 0, { type: "spring", stiffness: 300 })
				i++
			} else {
				clearInterval(interval)
			}
		}, 100)
		return () => clearInterval(interval)
	}, [text, cursorX, modalPage])

	const modalVariants = {
		hidden: { opacity: 0, scale: 0.8, y: -20 },
		visible: {
			opacity: 1,
			scale: 1,
			y: 0,
			transition: {
				type: "spring",
				stiffness: 300,
				damping: 25,
			},
		},
		exit: {
			opacity: 0,
			scale: 0.8,
			y: -20,
			transition: { duration: 0.2 },
		},
	}

	return (
		<Modal isOpen={!!modalPage} onClose={onClose}>
			<div className={styles.wrapper}>
				<AnimatePresence mode='wait'>
					{modalPage && (
						<motion.div
							className={styles.content}
							variants={modalVariants}
							initial='hidden'
							animate='visible'
							exit='exit'
						>
							<Terminal onClose={onClose}>
								<div className={styles.textBlock}>
									<span>{text.slice(0, displayedChars)}</span>
									<motion.span
										className={styles.terminal_cursor}
										style={{ x: cursorX }}
									/>
								</div>
							</Terminal>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</Modal>
	)
}

export default ModalPage
