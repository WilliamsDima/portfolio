import React, { useMemo, useRef } from "react"
import styles from "./ModalPage.module.scss"
import { useActions } from "@hooks/useActions"
import { Modal } from "@atoms/Modal/Modal"
import { useAppSelector } from "@hooks/useStore"
import { AnimatePresence, motion } from "framer-motion"
import { Terminal } from "@atoms/Terminal/Terminal"
import { TerminalLine } from "@atoms/Terminal/TerminalLine"

const ModalPage = () => {
	const { setModalPage, setSelectedPlanet, setModalPageSkipLine } = useActions()
	const { modalPage, appContent, modalPageSkipLine } = useAppSelector(
		store => store.app
	)

	const outputRef = useRef<HTMLDivElement>(null)

	const lines = useMemo(() => {
		switch (modalPage) {
			case "about":
				return appContent.about.main.lines

			case "skils":
				return appContent.about.skils.lines

			default:
				return []
		}
	}, [modalPage, appContent])

	const onClose = () => {
		setModalPage(null)
		setSelectedPlanet(null)
		setModalPageSkipLine({ ...modalPageSkipLine, [modalPage]: true })
	}

	return (
		<Modal isOpen={!!modalPage} onClose={onClose}>
			<div className={styles.wrapper} onClick={onClose}>
				<AnimatePresence mode='wait'>
					{modalPage && (
						<motion.div
							onClick={e => e.stopPropagation()}
							className={styles.content}
							variants={{
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
							}}
							initial='hidden'
							animate='visible'
							exit='exit'
						>
							<Terminal onClose={onClose} outputRef={outputRef}>
								{lines.map((it, i) => (
									<TerminalLine
										outputRef={outputRef}
										text={it}
										isLast={i === lines.length - 1}
										key={i}
										delyed={
											i === 0 ? 0 : lines.slice(0, i).join("").length * 30
										}
									/>
								))}
							</Terminal>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</Modal>
	)
}

export default ModalPage
