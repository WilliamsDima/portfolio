import React, { useEffect, useMemo, useRef, useState } from "react"
import { animate, motion, useMotionValue } from "framer-motion"
import styles from "./Terminal.module.scss"
import { useAppSelector } from "@hooks/useStore"

interface Props {
	text: string
	isLast: boolean
	delyed: number
}

export const TerminalLine: React.FC<Props> = ({ text, isLast, delyed }) => {
	const { modalPage, modalPageSkipLine } = useAppSelector(store => store.app)

	const [displayedChars, setDisplayedChars] = useState(0)
	const cursorX = useMotionValue(0)
	const count = useRef(0)

	const isSkip = useMemo(() => {
		return modalPageSkipLine[modalPage]
	}, [modalPageSkipLine, modalPage])

	useEffect(() => {
		if (isSkip) {
			setDisplayedChars(text.length)
			count.current = text.length
		}

		if ((!modalPage && !text) || isSkip) return

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
	}, [text, cursorX, modalPage, delyed, isSkip])

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
