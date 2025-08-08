import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import { AppRoutes } from "./routes"
import MainPage from "@templates/MainPage/MainPage"
import NotFoundPage from "@templates/NotFoundPage/NotFoundPage"
import GlobalLoading from "@organisms/GlobalLoading/GlobalLoading"

const AppRouter = () => {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const onLoad = () => setLoading(false)

		if (document.readyState === "complete") {
			setLoading(false)
		} else {
			window.addEventListener("load", onLoad)

			return () => window.removeEventListener("load", onLoad)
		}
	}, [])

	if (loading) return <GlobalLoading />

	return (
		<BrowserRouter>
			<Routes>
				<Route path={AppRoutes.main} element={<MainPage />} />
				<Route path={AppRoutes.notFount} element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default AppRouter
