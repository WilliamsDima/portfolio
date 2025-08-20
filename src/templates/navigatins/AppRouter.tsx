import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AppRoutes } from "./routes"
import MainPage from "@templates/MainPage/MainPage"
import NotFoundPage from "@templates/NotFoundPage/NotFoundPage"
import GlobalLoading from "@organisms/GlobalLoading/GlobalLoading"
import { useEffect } from "react"
import { getData, getImages } from "@config/firebase"
import { useActions } from "@hooks/useActions"
import { useAppSelector } from "@hooks/useStore"
import { IAppContent } from "@store/slice/appSlice"

const AppRouter = () => {
	const { setAppContent, setImages } = useActions()

	const { appContent, images } = useAppSelector(store => store.app)

	const getImagesHandler = async (res: IAppContent) => {
		const ids = Object.values(res.projects).map(it => it.id)
		const urls = await getImages(ids)

		Promise.all(urls).then(values => {
			setImages(values)
		})
	}

	useEffect(() => {
		getData().then(res => {
			setAppContent(res)
			getImagesHandler(res)
		})
	}, [])

	return (
		<>
			<GlobalLoading />
			{!!appContent && !!images.length && (
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
