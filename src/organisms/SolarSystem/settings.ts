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
}

export const planetsSettings: Record<string, PlanetType> = {
	earth: {
		distance: 20,
		size: 1,
		orbitSpeed: 0.5,
		rotationSpeed: 0.01,
		tilt: (23.5 * Math.PI) / 180,
		textureUrl: "./textures/earth.jpg",
		moon: true,
		label: "Обо мне",
		modalPage: "about",
		name: "earth",
	},
	mars: {
		distance: 25,
		size: 0.53,
		orbitSpeed: 0.45,
		rotationSpeed: 0.008,
		tilt: (25.2 * Math.PI) / 180,
		textureUrl: "./textures/mars.jpg",
		label: "Проекты",
		modalPage: "projects",
		name: "mars",
	},
	mercury: {
		distance: 10,
		size: 0.38,
		orbitSpeed: 0.8,
		rotationSpeed: 0.004,
		tilt: 0.0349,
		textureUrl: "./textures/mercury.jpg",
		name: "mercury",
	},
	uranus: {
		distance: 65,
		size: 1.2,
		orbitSpeed: 0.2,
		rotationSpeed: 0.015,
		tilt: (97.8 * Math.PI) / 180,
		textureUrl: "./textures/uranus.jpg",
		name: "uranus",
	},
	venus: {
		distance: 15,
		size: 0.95,
		orbitSpeed: 0.6,
		rotationSpeed: 0.002,
		tilt: (177.4 * Math.PI) / 180,
		textureUrl: "./textures/venus.jpg",
		name: "venus",
	},
	saturn: {
		distance: 50,
		size: 2.0,
		orbitSpeed: 0.25,
		rotationSpeed: 0.018,
		tilt: (26.7 * Math.PI) / 180,
		textureUrl: "./textures/saturn.jpg",
		label: "Навыки",
		modalPage: "skils",
		name: "saturn",
	},
	neptune: {
		distance: 80,
		size: 1.2,
		orbitSpeed: 0.15,
		rotationSpeed: 0.014,
		tilt: (28.3 * Math.PI) / 180,
		textureUrl: "./textures/neptune.jpg",
		name: "neptune",
	},
	jupiter: {
		distance: 35,
		size: 2.5,
		orbitSpeed: 0.3,
		rotationSpeed: 0.02,
		tilt: (3.1 * Math.PI) / 180,
		textureUrl: "./textures/jupiter.jpg",
		name: "jupiter",
	},
}

export const solarSettings = {
	sun: {
		size: 7,
		rotationY: 0.05,
		emissiveIntensity: 0.15, // яркость солнца
	},
	moon: {
		size: 0.27,
		textureUrl: "./textures/moon.jpg",
	},
	...planetsSettings,
}
