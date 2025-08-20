import React, { useMemo } from "react"
import styles from "./ProjectsCarousel.module.scss"
import { useAppSelector } from "@hooks/useStore"
import cn from "classnames"
import { motion } from "framer-motion"
import { useActions } from "@hooks/useActions"

const ProjectsCarousel = () => {
	const { setImageSelect } = useActions()
	const { appContent, imageSelect } = useAppSelector(store => store.app)

	const project = useMemo(() => {
		return appContent?.projects?.[imageSelect?.id]
	}, [appContent, imageSelect])

	const onClose = () => {
		setImageSelect(null)
	}

	return project ? (
		<motion.div
			onClick={onClose}
			className={styles.wrapper}
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
			<div className={styles.container} onClick={e => e.stopPropagation()}>
				<div
					className={cn(styles.carousel, {
						[styles.showArrow]: imageSelect?.urls?.length > 1,
					})}
				>
					{imageSelect?.urls?.map((url, i) => {
						return (
							<div key={i} className={cn(styles.item)} onClick={onClose}>
								<img
									src={url}
									alt=''
									className={styles.image}
									onClick={e => e.stopPropagation()}
								/>
							</div>
						)
					})}
				</div>
			</div>

			<div className={styles.info} onClick={e => e.stopPropagation()}>
				<p className={styles.name}>{project.name}</p>
				<a className={styles.link} href={project.link} target='_blank'>
					{project.link.includes("google") ? "Google Play" : "Github"}
				</a>
				<p className={styles.name}>
					[
					{project.technology.map((it, i) => {
						const color = appContent?.styles?.words?.[it]

						return (
							<span key={it} style={{ color: color || "white" }}>
								{it}
								{i !== project.technology.length - 1 && ", "}
							</span>
						)
					})}
					]
				</p>
			</div>
		</motion.div>
	) : (
		<></>
	)
}

export default ProjectsCarousel
