import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AppRoutes } from "./routes"
import MainPage from "@templates/MainPage/MainPage"
import NotFoundPage from "@templates/NotFoundPage/NotFoundPage"
import GlobalLoading from "@organisms/GlobalLoading/GlobalLoading"

const AppRouter = () => {
	return (
		<>
			<GlobalLoading />
			<BrowserRouter>
				<Routes>
					<Route path={AppRoutes.main} element={<MainPage />} />
					<Route path={AppRoutes.notFount} element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default AppRouter
