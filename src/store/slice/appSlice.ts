import {
	PlanetName,
	PlanetType,
	SolarSettingsType,
} from "@organisms/SolarSystem/settings"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type ModalPageType = "about" | "skils" | "projects"

export interface IAppContent {
	about: {
		main: {
			lines: string[]
		}
	}
	settings: {
		planetsSettings: Record<PlanetName, PlanetType>
		solarSettings: SolarSettingsType
	}
}

interface InitialState {
	appContent: IAppContent | null
	modalPage: ModalPageType | null
	selectedPlanet: PlanetType | null
}

const initialState: InitialState = {
	appContent: null,
	modalPage: null,
	selectedPlanet: null,
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
