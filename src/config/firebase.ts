import { initializeApp } from "firebase/app"
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore/lite"
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

export const getProjects = async () => {
	const docRef = doc(db, "portfolio", "data")
	const docSnap = await getDoc(docRef)
	const data = docSnap.data()

	console.log("data", data)

	return data as IAppContent
}

export const getImages = async (ids: number[]) => {
	const urls = ids?.map(async id => {
		const imageListRef = ref(storage, `works/${id}`)

		const { items } = await listAll(imageListRef)

		const images = items.map(async item => {
			return await getDownloadURL(item)
		})

		return Promise.all(images).then(values => {
			return {
				id,
				urls: values,
			}
		})
	})

	return urls
}

const planetSize = 1.2 // пример размера планеты
const colors = [
	"#1FB141",
	"#FF6B6B",
	"#4ECDC4",
	"#556270",
	"#C7F464",
	"#FFCC5C",
	"#C44D58",
	"#FFA07A",
	"#20B2AA",
	"#9370DB",
	"#FFD700",
	"#40E0D0",
]

const projects = {
	11: {
		name: "Управление финансами",
		technology: ["React Native", "Redux Toolkit", "TypeScript"],
		id: 11,
		link: "https://play.google.com/store/apps/details?id=com.moneymanager_williams",
		date: new Date("2022-10-28"),
		// size: planetSize / 2,
		color: colors[0],
		// speed: 0.15,
		// rotationSpeed: 0.015,
		// orbitDistance: planetSize * 2.5 + 5 + 0 * 2,
	},
	12: {
		name: "Запоминатор Lite",
		technology: ["React Native", "Redux Toolkit"],
		id: 12,
		link: "https://play.google.com/store/apps/details?id=com.eclipse.my_to_do_list_lite",
		date: new Date("2022-07-09"),
		// size: planetSize / 2.5,
		color: colors[1],
		// speed: 0.12,
		// rotationSpeed: 0.012,
		// orbitDistance: planetSize * 2.5 + 5 + 1 * 2,
	},
	13: {
		name: "Запоминатор",
		technology: ["React Native", "Redux Toolkit"],
		id: 13,
		link: "https://play.google.com/store/apps/details?id=com.eclipse.my_to_do_list",
		date: new Date("2022-03-15"),
		// size: planetSize / 3,
		color: colors[2],
		// speed: 0.13,
		// rotationSpeed: 0.013,
		// orbitDistance: planetSize * 2.5 + 5 + 2 * 2,
	},
	14: {
		name: "Build Tower",
		technology: ["C#", "Unity"],
		id: 14,
		link: "https://play.google.com/store/apps/details?id=com.TELGame.BuildTower",
		date: new Date("2020-11-09"),
		// size: planetSize / 1.5,
		color: colors[3],
		// speed: 0.14,
		// rotationSpeed: 0.014,
		// orbitDistance: planetSize * 2.5 + 5 + 3 * 2,
	},
	1: {
		name: "Верстка сайта - портфолио по макету",
		technology: ["JavaScript", "SCSS", "Gulp"],
		id: 1,
		link: "https://github.com/WilliamsDima/Page-Template",
		date: new Date("2019-06-11"),
		// size: planetSize / 1.5,
		color: colors[4],
		// speed: 0.11,
		// rotationSpeed: 0.011,
		// orbitDistance: planetSize * 2.5 + 5 + 4 * 2,
	},
	2: {
		name: "Верстка сайта по шаблону",
		technology: ["JavaScript", "SCSS", "Gulp"],
		id: 2,
		link: "https://github.com/WilliamsDima/Clean_and_simple_website",
		date: new Date("2019-07-15"),
		// size: planetSize / 1.5,
		color: colors[5],
		// speed: 0.12,
		// rotationSpeed: 0.012,
		// orbitDistance: planetSize * 2.5 + 5 + 5 * 2,
	},
	3: {
		name: "Верстка сайта банка по макету",
		technology: ["JavaScript", "SCSS", "Gulp"],
		id: 3,
		link: "https://github.com/WilliamsDima/Model_window",
		date: new Date("2019-07-14"),
		// size: planetSize / 2,
		color: colors[6],
		// speed: 0.13,
		// rotationSpeed: 0.013,
		// orbitDistance: planetSize * 2.5 + 5 + 6 * 2,
	},
	4: {
		name: "CODE BASE",
		technology: [
			"React",
			"Redux Toolkit",
			"Material UI",
			"Firebase",
			"TypeScript",
		],
		id: 4,
		link: "https://github.com/WilliamsDima/code_base",
		date: new Date("2022-10-17"),
		// size: planetSize / 1.7,
		color: colors[7],
		// speed: 0.14,
		// rotationSpeed: 0.014,
		// orbitDistance: planetSize * 2.5 + 5 + 7 * 2,
	},
	5: {
		name: "Тестовое задание, верстка и фильтр магазина",
		technology: ["JavaScript", "SCSS", "Gulp"],
		id: 5,
		link: "https://github.com/WilliamsDima/Cats-store",
		date: new Date("2019-08-12"),
		// size: planetSize / 2,
		color: colors[8],
		// speed: 0.12,
		// rotationSpeed: 0.012,
		// orbitDistance: planetSize * 2.5 + 5 + 8 * 2,
	},
	6: {
		name: "Верстка сайта по макету",
		technology: ["jQuery", "JavaScript", "SCSS", "Gulp"],
		id: 6,
		link: "https://github.com/WilliamsDima/pc_courses",
		date: new Date("2019-07-12"),
		// size: planetSize / 1.5,
		color: colors[9],
		// speed: 0.13,
		// rotationSpeed: 0.013,
		// orbitDistance: planetSize * 2.5 + 5 + 9 * 2,
	},
	7: {
		name: "Верстка сайта по макету",
		technology: ["jQuery", "JavaScript", "SCSS", "Gulp"],
		id: 7,
		link: "https://github.com/WilliamsDima/Mogo",
		date: new Date("2019-05-10"),
		// size: planetSize / 1.8,
		color: colors[10],
		// speed: 0.11,
		// rotationSpeed: 0.011,
		// orbitDistance: planetSize * 2.5 + 5 + 10 * 2,
	},
	8: {
		name: "Многостраничный блог",
		technology: ["jQuery", "JavaScript", "SCSS", "Gulp"],
		id: 8,
		link: "https://github.com/WilliamsDima/Personal-blog",
		date: new Date("2019-07-17"),
		// size: planetSize / 2.2,
		color: colors[11],
		// speed: 0.12,
		// rotationSpeed: 0.012,
		// orbitDistance: planetSize * 2.5 + 5 + 11 * 2,
	},
	9: {
		name: "Ребрендинг сайта",
		technology: ["JavaScript", "CSS"],
		id: 9,
		link: "https://github.com/WilliamsDima/Alfastroi",
		date: new Date("2018-04-03"),
		// size: planetSize / 2,
		color: colors[0],
		// speed: 0.1,
		// rotationSpeed: 0.01,
		// orbitDistance: planetSize * 2.5 + 5 + 12 * 2,
	},
	10: {
		name: "Тестовое задание, сайт-портфолио",
		technology: ["React", "Redux", "SCSS"],
		id: 10,
		link: "https://github.com/WilliamsDima/test_task_Axeta",
		date: new Date("2020-05-21"),
		// size: planetSize / 2.5,
		color: colors[1],
		// speed: 0.12,
		// rotationSpeed: 0.012,
		// orbitDistance: planetSize * 2.5 + 5 + 13 * 2,
	},
	15: {
		name: "Динамика роста цен товаров",
		technology: [
			"JavaScript",
			"Redux Toolkit",
			"SCSS",
			"Firebase",
			"CI/CD",
			"Material UI",
			"TypeScript",
		],
		id: 15,
		link: "https://github.com/WilliamsDima/next_rising_prices",
		date: new Date("2022-12-15"),
		// size: planetSize / 1.7,
		color: colors[2],
		// speed: 0.14,
		// rotationSpeed: 0.014,
		// orbitDistance: planetSize * 2.5 + 5 + 14 * 2,
	},
	16: {
		name: "Password Manager",
		technology: [
			"React Native",
			"Redux Toolkit",
			"Firebase",
			"Crypto-JavaScript",
			"TypeScript",
			"RTK Query",
		],
		id: 16,
		link: "https://play.google.com/store/apps/details?id=com.eclipse.account_manager",
		date: new Date("2023-01-28"),
		// size: planetSize / 1.7,
		color: colors[3],
		// speed: 0.15,
		// rotationSpeed: 0.015,
		// orbitDistance: planetSize * 2.5 + 5 + 15 * 2,
	},
	17: {
		name: "Telegram Storage",
		technology: [
			"React",
			"Next JavaScript",
			"Redux Toolkit",
			"TypeScript",
			"Firebase",
			"SCSS",
		],
		id: 17,
		link: "https://github.com/WilliamsDima/telegram_storage",
		date: new Date("2023-03-01"),
		// size: planetSize / 1.6,
		color: colors[4],
		// speed: 0.13,
		// rotationSpeed: 0.013,
		// orbitDistance: planetSize * 2.5 + 5 + 16 * 2,
	},
	18: {
		name: "Карточки со словами",
		technology: [
			"React Native",
			"Redux Toolkit",
			"TypeScript",
			"Firebase",
			"FSD",
			"Chat GPT",
			"RTK Query",
		],
		id: 18,
		link: "https://play.google.com/store/apps/details?id=com.williamsdev.wordcards",
		date: new Date("2024-12-20"),
		// size: planetSize / 1.3,
		color: colors[5],
		// speed: 0.14,
		// rotationSpeed: 0.014,
		// orbitDistance: planetSize * 2.5 + 5 + 17 * 2,
	},
}

export async function uploadPlanetsSettings() {
	const ref = doc(db, "portfolioV2", "data")
	await setDoc(
		ref,
		{
			projects,
		},
		{ merge: true } // чтобы не потерять другие данные в data
	)
	console.log("✅ Planets settings uploaded в settings.planetsSettings")
}
