export const AppRoutes = {
	main: "/",
	notFount: "*",
} as const

export type AppRouteKey = keyof typeof AppRoutes
export type AppRoutePath = (typeof AppRoutes)[AppRouteKey]

export interface RouteParams {
	[AppRoutes.main]: undefined
	[AppRoutes.notFount]: undefined
}
