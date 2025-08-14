import { FC, ReactNode, useEffect } from "react"
import ReactDOM from "react-dom"
import styles from "./Modal.module.scss"
import cn from "classnames"

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose()
		}
		document.addEventListener("keydown", handleEsc)
		return () => document.removeEventListener("keydown", handleEsc)
	}, [onClose])

	return ReactDOM.createPortal(
		<div
			className={cn(styles.modal, {
				[styles.open]: isOpen,
			})}
			//onClick={onClose}
		>
			<div className={styles.modalContent} onClick={e => e.stopPropagation()}>
				{children}
			</div>
		</div>,
		document.body
	)
}
