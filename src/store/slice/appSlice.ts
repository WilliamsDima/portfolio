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

export interface IAppContent {
	about: {
		main: {
			lines: string[]
		}
		skils: {
			lines: string[]
		}
	}
	settings: {
		planetsSettings: Record<PlanetName, PlanetType>
		solarSettings: SolarSettingsType
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
}

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setModalPage: (state, { payload }: PayloadAction<null | ModalPageType>) => {
			state.modalPage = payload
		},
		setAppContent: (state, { payload }: PayloadAction<IAppContent | null>) => {
			state.appContent = payload
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
