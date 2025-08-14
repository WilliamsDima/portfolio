import { PlanetType } from "@organisms/SolarSystem/settings"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type ModalPageType = "about" | "skils" | "projects"

interface InitialState {
	modalPage: ModalPageType | null
	selectedPlanet: PlanetType | null
}

const initialState: InitialState = {
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
