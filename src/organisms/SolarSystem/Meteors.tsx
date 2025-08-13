import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import { Mesh } from "three"

interface Meteor {
	distance: number
	size: number
	color: string
	speed: number
	rotationSpeed: number
	angle: number
	axisRotation: [number, number, number]
}

export const Meteors = ({
	count = 300,
	innerRadius = 100,
	outerRadius = 200,
}) => {
	const meteorRefs = useRef<Mesh[]>([])

	// генерируем метеориты
	const meteors: Meteor[] = useMemo(() => {
		const arr: Meteor[] = []
		const colors = ["#cccccc", "#aaaaaa", "#888888", "#ffccaa", "#ffeeaa"]

		for (let i = 0; i < count; i++) {
			const distance = innerRadius + Math.random() * (outerRadius - innerRadius)
			const angle = Math.random() * Math.PI * 2
			arr.push({
				distance,
				size: 0.03 + Math.random() * 0.1,
				color: colors[Math.floor(Math.random() * colors.length)],
				speed: 0.002 + Math.random() * 0.008, // вращение вокруг cолнца
				rotationSpeed: 0.01 + Math.random() * 0.02, // вращение вокруг своей оси
				angle,
				axisRotation: [
					Math.random() * Math.PI,
					Math.random() * Math.PI,
					Math.random() * Math.PI,
				],
			})
		}
		return arr
	}, [count, innerRadius, outerRadius])

	// анимация
	useFrame(() => {
		meteors.forEach((meteor, i) => {
			const mesh = meteorRefs.current[i]
			if (!mesh) return

			// вращение вокруг Солнца
			meteor.angle += meteor.speed
			mesh.position.x = Math.cos(meteor.angle) * meteor.distance
			mesh.position.z = Math.sin(meteor.angle) * meteor.distance
			mesh.position.y = (Math.random() - 0.5) * 5 // небольшая толщина по Y

			// вращение вокруг своей оси
			mesh.rotation.x += meteor.rotationSpeed
			mesh.rotation.y += meteor.rotationSpeed * 0.5
		})
	})

	return (
		<>
			{meteors.map((meteor, i) => (
				<mesh
					key={i}
					ref={el => (meteorRefs.current[i] = el!)}
					rotation={meteors[i].axisRotation}
				>
					<sphereGeometry args={[meteors[i].size, 6, 6]} />
					<meshStandardMaterial
						color={meteors[i].color}
						roughness={0.7}
						metalness={0.2}
					/>
				</mesh>
			))}
		</>
	)
}
