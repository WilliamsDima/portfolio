import React, { useEffect, useRef, useState } from "react"
import { animate, motion, useMotionValue } from "framer-motion"
import styles from "./Terminal.module.scss"
import { useAppSelector } from "@hooks/useStore"

interface Props {
	text: string
	isLast: boolean
	delyed: number
}

export const TerminalLine: React.FC<Props> = ({ text, isLast, delyed }) => {
	const { modalPage } = useAppSelector(store => store.app)

	const [displayedChars, setDisplayedChars] = useState(0)
	const cursorX = useMotionValue(0)
	const count = useRef(0)

	useEffect(() => {
		if (!modalPage && !text) return

		let interval

		const timeout = setTimeout(() => {
			interval = setInterval(() => {
				if (count.current < text.length) {
					setDisplayedChars(count.current + 1)
					animate(cursorX, 0, { type: "spring", stiffness: 300 })
					count.current++
				} else {
					clearInterval(interval)
				}
			}, 30)
		}, delyed)

		return () => {
			clearInterval(interval)
			clearTimeout(timeout)
		}
	}, [text, cursorX, modalPage, delyed])

	return (
		<div className={styles.textBlock}>
			<span className={styles.outputLine}>
				{text.slice(0, displayedChars)}{" "}
				{text.length === count.current || count.current === 0 ? "" : "|"}
			</span>
			{isLast && text.length === count.current && (
				<motion.span
					className={styles.terminal_cursor}
					style={{ x: cursorX }}
				/>
			)}
		</div>
	)
}
