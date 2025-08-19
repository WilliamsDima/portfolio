import { FC, ReactNode, RefObject } from "react"
import styles from "./Terminal.module.scss"
import cn from "classnames"
import { useAppSelector } from "@hooks/useStore"

interface Props {
	children: ReactNode
	onClose?: () => void
	outputRef: RefObject<HTMLDivElement>
}

export const Terminal: FC<Props> = ({ children, onClose, outputRef }) => {
	const { modalPage } = useAppSelector(store => store.app)

	return (
		<div className={styles.container}>
			<div className={styles.terminal_toolbar}>
				<div className={styles.butt}>
					<button
						className={cn(styles.btn, styles.btn_color)}
						onClick={onClose}
					>
						<span>x</span>
					</button>
					<button className={styles.btn}></button>
					<button className={styles.btn}></button>
				</div>
				<p className={styles.user}>00Williams@admin: ~</p>
				<div className={styles.add_tab}>+</div>
			</div>
			<div className={styles.terminal_body}>
				<div className={styles.terminal_output} ref={outputRef}>
					<div className={styles.terminal_prompt}>
						<span className={styles.terminal_user}>00Williams@admin:</span>
						<span className={styles.terminal_location}>~</span>
						<span className={styles.terminal_bling}>$</span>
						<span className={styles.command}>user/{modalPage}</span>
					</div>

					<pre className={styles.output_text}>{children}</pre>
				</div>
				<div className={styles.terminal_input}>
					<input
						disabled
						placeholder='Type a command...'
						className='input_text'
						type='text'
					/>
				</div>
			</div>
		</div>
	)
}
