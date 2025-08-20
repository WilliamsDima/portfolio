import { useEffect } from "react"

export const useBlockAdded = (id: string, callback: (v: boolean) => void) => {
	useEffect(() => {
		// Проверка, вдруг элемент уже есть
		if (document.getElementById(id)) {
			callback(true)
			return
		}

		const observer = new MutationObserver(() => {
			if (document.getElementById(id)) {
				callback(true)
				observer.disconnect() // останавливаем наблюдение после появления
			}
		})

		observer.observe(document.body, {
			childList: true,
			subtree: true, // ищем во всех потомках
		})

		return () => observer.disconnect()
	}, [id, callback])
}
