import { useFrame, useLoader } from "@react-three/fiber"
import { FC, ReactNode, RefObject, useRef } from "react"
import {
	BufferGeometry,
	Float32BufferAttribute,
	Group,
	Mesh,
	TextureLoader,
} from "three"
import { planetsSettings } from "./settings"

const SaturnParticleRing = ({ innerRadius, outerRadius, segments }) => {
	const points = []
	for (let i = 0; i < segments; i++) {
		const angle = Math.random() * Math.PI * 2
		const radius = innerRadius + Math.random() * (outerRadius - innerRadius)
		const x = Math.cos(angle) * radius
		const z = Math.sin(angle) * radius
		const y = (Math.random() - 0.5) * 0.05 // толщина
		points.push(x, y, z)
	}

	const geometry = new BufferGeometry()
	geometry.setAttribute("position", new Float32BufferAttribute(points, 3))

	return (
		<points>
			<primitive object={geometry} attach='geometry' />
			<pointsMaterial color='lightgray' size={0.05} />
		</points>
	)
}

type Props = {
	label: ReactNode
	planetRef: RefObject<Group>
	onClick: () => void
}

export const Saturn: FC<Props> = ({ label, planetRef, onClick }) => {
	const ringRef = useRef<Mesh>(null)
	const planetTexture = useLoader(TextureLoader, "./textures/saturn.jpg")

	useFrame(({ clock }) => {
		const t = clock.getElapsedTime()
		const angle = t * planetsSettings.saturn.orbitSpeed

		// Вращение планеты вокруг солнца
		if (planetRef.current) {
			planetRef.current.position.x =
				Math.cos(angle) * planetsSettings.saturn.distance
			planetRef.current.position.z =
				Math.sin(angle) * planetsSettings.saturn.distance
			planetRef.current.rotation.y += planetsSettings.saturn.rotationSpeed
		}

		// Пульсация свечения кольца
		if (ringRef.current) {
			ringRef.current.material.emissiveIntensity =
				0.3 + Math.sin(clock.getElapsedTime() * 2) * 0.1
		}
	})

	return (
		<group ref={planetRef} onClick={onClick}>
			<mesh rotation={[0, 0, planetsSettings.saturn.tilt]}>
				<sphereGeometry args={[planetsSettings.saturn.size, 32, 32]} />
				<meshStandardMaterial map={planetTexture} />

				{/* оси координат для ориентации */}
				{/* <primitive object={new AxesHelper(solarSettings.saturn.size * 1.5)} /> */}
			</mesh>

			{label}

			{/* Кольцо */}
			<mesh ref={ringRef} rotation={[0, 0, planetsSettings.saturn.tilt]}>
				<SaturnParticleRing innerRadius={3} outerRadius={4} segments={500} />
			</mesh>
		</group>
	)
}
