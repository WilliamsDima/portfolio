import { FC, ReactNode, useEffect } from "react"
import "./Layout.scss"
import Sun from "@atoms/Sun/Sun"

type Props = {
	children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY

			// Чем меньше коэффициент — тем медленнее движение
			document.querySelector<HTMLElement>(
				".stars"
			)!.style.transform = `translateY(${scrollY * 0.05}px)`
			document.querySelector<HTMLElement>(
				".sun"
			)!.style.transform = `translateY(-${scrollY * 0.1}px)`
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<div className='page'>
			<div className='parallax-container'>
				<div className='layer stars'>
					<div id='stars'></div>
					<div id='stars2'></div>
					<div id='stars3'></div>
				</div>

				<div className='layer sun'>
					<div className='sun-object'>
						<Sun />
					</div>
				</div>
			</div>

			<div className='content'>{children}</div>
		</div>
	)
}

export default Layout
