import { useFrame, useLoader } from "@react-three/fiber"
import { useRef } from "react"
import {
	BufferGeometry,
	Float32BufferAttribute,
	Group,
	Mesh,
	TextureLoader,
} from "three"
import { solarSettings } from "./settings"

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

export const Saturn = () => {
	const planetRef = useRef<Group>(null)
	const ringRef = useRef<Mesh>(null)
	const planetTexture = useLoader(TextureLoader, "./textures/saturn.jpg")

	useFrame(({ clock }) => {
		const t = clock.getElapsedTime()
		const angle = t * solarSettings.saturn.orbitSpeed

		// Вращение планеты вокруг солнца
		if (planetRef.current) {
			planetRef.current.position.x =
				Math.cos(angle) * solarSettings.saturn.distance
			planetRef.current.position.z =
				Math.sin(angle) * solarSettings.saturn.distance
			planetRef.current.rotation.y += solarSettings.saturn.rotationSpeed
		}

		// Пульсация свечения кольца
		if (ringRef.current) {
			ringRef.current.material.emissiveIntensity =
				0.3 + Math.sin(clock.getElapsedTime() * 2) * 0.1
		}
	})

	return (
		<group ref={planetRef}>
			<mesh rotation={[0, 0, solarSettings.saturn.tilt]}>
				<sphereGeometry args={[solarSettings.saturn.size, 32, 32]} />
				<meshStandardMaterial map={planetTexture} />

				{/* оси координат для ориентации */}
				{/* <primitive object={new AxesHelper(solarSettings.saturn.size * 1.5)} /> */}
			</mesh>

			{/* Кольцо */}
			<mesh ref={ringRef} rotation={[0, 0, solarSettings.saturn.tilt]}>
				<SaturnParticleRing innerRadius={3} outerRadius={4} segments={500} />
			</mesh>
		</group>
	)
}
