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
	const { modalPage, modalPageSkipLine, appContent } = useAppSelector(
		store => store.app
	)

	const [displayedChars, setDisplayedChars] = useState(0)
	const cursorX = useMotionValue(0)
	const count = useRef(0)

	const isSkip = useMemo(
		() => modalPageSkipLine[modalPage],
		[modalPageSkipLine, modalPage]
	)

	// разбиваем строку на токены (слово/не слово)
	const tokens = useMemo(() => {
		const words = Object.keys(appContent.styles.words).sort(
			(a, b) => b.length - a.length
		) // длинные вперёд
		if (words.length === 0) return [{ text, color: undefined }]

		const regex = new RegExp(`(${words.join("|")})`, "gi")
		return text.split(regex).map(part => {
			const match = words.find(w => w.toLowerCase() === part.toLowerCase())
			return {
				text: part,
				color: match ? appContent.styles.words[match] : undefined,
			}
		})
	}, [text, appContent])

	const fullText = useMemo(() => tokens.map(t => t.text).join(""), [tokens])

	useEffect(() => {
		if (isSkip) {
			setDisplayedChars(fullText.length)
			count.current = fullText.length
			return
		}

		if (!modalPage || !fullText) return

		let interval: NodeJS.Timeout
		const timeout = setTimeout(() => {
			interval = setInterval(() => {
				if (count.current < fullText.length) {
					count.current++
					setDisplayedChars(count.current)
					animate(cursorX, 0, { type: "spring", stiffness: 300 })
				} else {
					clearInterval(interval)
				}
			}, 30)
		}, delyed)

		return () => {
			clearInterval(interval)
			clearTimeout(timeout)
		}
	}, [fullText, cursorX, modalPage, delyed, isSkip])

	// формируем вывод токенов с учётом displayedChars
	const renderedTokens = useMemo(() => {
		let printed = 0
		return tokens.map((t, i) => {
			const charsLeft = displayedChars - printed
			const visible = charsLeft > 0 ? t.text.slice(0, charsLeft) : ""
			printed += visible.length
			return (
				<span key={i} style={{ color: t.color }}>
					{visible}
				</span>
			)
		})
	}, [tokens, displayedChars])

	return (
		<div className={styles.textBlock}>
			<span className={styles.outputLine}>
				{renderedTokens}
				{fullText.length === count.current || count.current === 0 ? "" : "|"}
			</span>
			{isLast && fullText.length === count.current && (
				<motion.span
					className={styles.terminal_cursor}
					style={{ x: cursorX, y: -30 }}
				/>
			)}
		</div>
	)
}
