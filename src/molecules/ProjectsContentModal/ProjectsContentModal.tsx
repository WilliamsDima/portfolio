import React, { useMemo } from "react"
import styles from "./ProjectsContentModal.module.scss"
import { useAppSelector } from "@hooks/useStore"
import cn from "classnames"
import { useActions } from "@hooks/useActions"

const ProjectsContentModal = () => {
	const { setImageSelect } = useActions()
	const { appContent, images } = useAppSelector(store => store.app)

	const projects = useMemo(() => {
		return Object.values(appContent.projects)
	}, [appContent])

	return (
		<div className={styles.items}>
			{projects.map(it => {
				const image = images.find(img => img.id === it.id)

				return (
					<div key={it.id} className={styles.item}>
						<span className={cn(styles.folder)}>📁</span>
						<span className={cn(styles.arrow)}> -&gt; </span>
						<span className={cn(styles.arrow)}> projects </span>
						<span className={cn(styles.arrow)}> -&gt; </span>
						<a className={styles.name} href={it.link} target='_blank'>
							{it.name}
							<span className={cn(styles.arrow, styles.technology)}>
								[{it.technology.join(", ")}]
							</span>
						</a>

						<span className={cn(styles.arrow)}> -&gt; </span>
						<p
							className={cn(styles.name, styles.images)}
							onClick={() => setImageSelect(image)}
						>
							images.png
							<div
								className={cn(styles.image)}
								style={{ backgroundImage: `url(${image.urls[0]})` }}
							/>
						</p>
					</div>
				)
			})}
		</div>
	)
}

export default ProjectsContentModal
