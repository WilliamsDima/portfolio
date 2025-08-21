import {
	PlanetName,
	PlanetType,
	SolarSettingsType,
} from "@organisms/SolarSystem/settings"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type ModalPageType = "about" | "skils" | "projects"
export type NameWord =
	| "React"
	| "Redux"
	| "JavaScript"
	| "SCSS"
	| "TypeScript"
	| "Redux Toolkit"
	| "RTK Query"
	| "Axios"
	| "React Native"
	| "MobX"
	| "Firebase"
	| "Zustand"
	| "Yandex map"
	| "Google map"
	| "Kameleoon"
	| "RuYou"
	| "Rocket Firm"
	| "Toyota"
	| "LIDL"
	| "Nespresso"
	| "IQOS"
	| "Yves Rocher"
	| "Home Credit Bank"
	| "Росбанк"
	| "Аскона"
	| "Bigam"

export interface IProject {
	name: string
	technology: string[]
	id: number
	link: string
	date: Date
	color: string
}

export interface IAppContent {
	about: {
		main: {
			lines: string[]
		}
		skils: {
			lines: string[]
		}
	}
	projects: Record<number, IProject>
	settings: {
		planetsSettings: Record<PlanetName, PlanetType>
		solarSettings: SolarSettingsType
		terminalTextSpeed: number
		globalSpeed: number
	}
	styles: {
		words: Record<NameWord, string>
	}
}

interface InitialState {
	appContent: IAppContent | null
	modalPage: ModalPageType | null
	modalPageSkipLine: Record<ModalPageType, boolean>
	selectedPlanet: PlanetType | null
	images: { id: number; urls: string[] }[]
	imageSelect: null | { id: number; urls: string[] }
	threeJsIsLoad: boolean
}

const initialState: InitialState = {
	appContent: null,
	modalPage: null,
	selectedPlanet: null,
	modalPageSkipLine: {
		about: false,
		projects: false,
		skils: false,
	},
	images: [],
	imageSelect: null,
	threeJsIsLoad: true,
}

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setThreeJsIsLoad: (state, { payload }: PayloadAction<boolean>) => {
			state.threeJsIsLoad = payload
		},
		setModalPage: (state, { payload }: PayloadAction<null | ModalPageType>) => {
			state.modalPage = payload
		},
		setAppContent: (state, { payload }: PayloadAction<IAppContent | null>) => {
			state.appContent = payload
		},
		setImageSelect: (
			state,
			{ payload }: PayloadAction<null | { id: number; urls: string[] }>
		) => {
			state.imageSelect = payload
		},
		setImages: (
			state,
			{ payload }: PayloadAction<{ id: number; urls: string[] }[]>
		) => {
			state.images = payload
		},
		setModalPageSkipLine: (
			state,
			{ payload }: PayloadAction<Record<ModalPageType, boolean>>
		) => {
			state.modalPageSkipLine = payload
		},
		setSelectedPlanet: (
			state,
			{ payload }: PayloadAction<PlanetType | null>
		) => {
			state.selectedPlanet = payload
		},
	},
})

export const appActions = appSlice.actions

export default appSlice.reducer
