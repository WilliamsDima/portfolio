import { initializeApp } from "firebase/app"
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage"
import { getFirestore, doc, getDoc } from "firebase/firestore/lite"
import { IAppContent } from "@store/slice/appSlice"

const firebaseConfig = {
	apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env
		.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export const getData = async () => {
	const docRef = doc(db, "portfolioV2", "data")
	const docSnap = await getDoc(docRef)
	const data = docSnap.data()

	return data as IAppContent
}

export const getImagesWorks = async works => {
	const urls = works?.map(async work => {
		const imageListRef = ref(storage, `works/${work.folder}`)

		const { items } = await listAll(imageListRef)

		const images = items.map(async item => {
			return await getDownloadURL(item)
		})

		return Promise.all(images).then(values => {
			return {
				id: work.id,
				urls: values,
			}
		})
	})

	return urls
}

// export async function uploadPlanetsSettings() {
// 	const ref = doc(db, "portfolioV2", "data")
// 	await setDoc(
// 		ref,
// 		{
// 			settings: {
// 				solarSettings,
// 			},
// 		},
// 		{ merge: true } // чтобы не потерять другие данные в data
// 	)
// 	console.log("✅ Planets settings uploaded в settings.planetsSettings")
// }
