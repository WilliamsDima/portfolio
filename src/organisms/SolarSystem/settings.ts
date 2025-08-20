import { ModalPageType } from "./../../store/slice/appSlice"

export type PlanetName =
	| "earth"
	| "mars"
	| "mercury"
	| "uranus"
	| "venus"
	| "saturn"
	| "neptune"
	| "jupiter"

export type PlanetType = {
	distance: number
	size: number
	orbitSpeed: number
	rotationSpeed: number
	tilt: number
	textureUrl: string
	moon?: boolean
	label?: string
	modalPage?: ModalPageType
	name: PlanetName
	isProjects?: boolean
}

export type SolarSettingsType = {
	sun: {
		size: number
		rotationY: number
		emissiveIntensity: number // яркость солнца
		textureUrl: string
	}
	moon: {
		size: number
		textureUrl: string
	}
}
