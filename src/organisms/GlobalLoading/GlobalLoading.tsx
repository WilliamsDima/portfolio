import { useEffect, useState } from "react"
import "./GlobalLoading.scss"
import cn from "classnames"
import { useAppSelector } from "@hooks/useStore"

const GlobalLoading = () => {
	const [loading, setLoading] = useState(true)

	const { appContent, images, threeJsIsLoad } = useAppSelector(
		store => store.app
	)

	useEffect(() => {
		document.body.classList.add("hidden")
		const onLoad = () => {
			setTimeout(() => {
				setLoading(false)

				document.body.classList.remove("hidden")
			}, 1000)
		}

		if (document.readyState === "complete") {
			setTimeout(() => {
				setLoading(false)
				document.body.classList.remove("hidden")
			}, 1000)
		} else {
			window.addEventListener("load", onLoad)

			return () => window.removeEventListener("load", onLoad)
		}
	}, [])

	return (
		<div
			className={cn("loading-page", {
				["active"]: loading || !appContent || !images.length || threeJsIsLoad,
			})}
		>
			<div className='solar'>
				<i className='mercury'></i>
				<i className='venus'></i>
				<i className='earth'></i>
				<i className='mars'></i>
				<i className='belt'></i>
				<i className='jupiter'></i>
				<i className='saturn'></i>
				<i className='uranus'></i>
				<i className='neptune'></i>
			</div>

			<div className='loader-text'>
				<span>&lt;</span>
				<span>LOADING</span>
				<span>/&gt;</span>
			</div>
		</div>
	)
}

export default GlobalLoading
