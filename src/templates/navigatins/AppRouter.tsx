import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AppRoutes } from "./routes"
import MainPage from "@templates/MainPage/MainPage"
import NotFoundPage from "@templates/NotFoundPage/NotFoundPage"
import GlobalLoading from "@organisms/GlobalLoading/GlobalLoading"
import { useEffect } from "react"
import { getData } from "@config/firebase"
import { useActions } from "@hooks/useActions"
import { useAppSelector } from "@hooks/useStore"

const AppRouter = () => {
	const { setAppContent } = useActions()

	const { appContent } = useAppSelector(store => store.app)

	useEffect(() => {
		getData().then(res => {
			setAppContent(res)
		})
	}, [])

	return (
		<>
			<GlobalLoading />
			{!!appContent && (
				<BrowserRouter>
					<Routes>
						<Route path={AppRoutes.main} element={<MainPage />} />
						<Route path={AppRoutes.notFount} element={<NotFoundPage />} />
					</Routes>
				</BrowserRouter>
			)}
		</>
	)
}

export default AppRouter
