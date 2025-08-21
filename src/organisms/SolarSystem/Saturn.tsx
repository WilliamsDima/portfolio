import { useAppSelector } from "@hooks/useStore"
import { useFrame, useLoader } from "@react-three/fiber"
import { FC, ReactNode, RefObject, useRef } from "react"
import {
	BufferGeometry,
	Float32BufferAttribute,
	Group,
	Mesh,
	TextureLoader,
} from "three"

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

	const { appContent } = useAppSelector(store => store.app)

	const planetTexture = useLoader(TextureLoader, "./textures/saturn.jpg")

	useFrame(({ clock }) => {
		const t = clock.getElapsedTime()
		const angle =
			t * (appContent?.settings?.planetsSettings?.saturn?.orbitSpeed || 0)

		// Вращение планеты вокруг солнца
		if (planetRef.current) {
			planetRef.current.position.x =
				Math.cos(angle) *
				(appContent?.settings?.planetsSettings?.saturn.distance || 0)
			planetRef.current.position.z =
				Math.sin(angle) *
				(appContent?.settings?.planetsSettings?.saturn.distance || 0)
			planetRef.current.rotation.y +=
				appContent?.settings?.planetsSettings?.saturn.rotationSpeed /
					appContent.settings.globalSpeed || 0
		}

		// Пульсация свечения кольца
		if (ringRef.current) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			ringRef.current.material.emissiveIntensity =
				0.3 + Math.sin(clock.getElapsedTime() * 2) * 0.1
		}
	})

	return (
		<group
			ref={planetRef}
			onClick={onClick}
			onPointerOver={e => {
				e.stopPropagation()
				document.body.style.cursor = "pointer"
			}}
			onPointerOut={e => {
				e.stopPropagation()
				document.body.style.cursor = "auto"
			}}
		>
			<mesh
				rotation={[
					0,
					0,
					appContent?.settings?.planetsSettings?.saturn?.tilt || 0,
				]}
			>
				<sphereGeometry
					args={[
						appContent?.settings?.planetsSettings?.saturn?.size || 0,
						32,
						32,
					]}
				/>
				<meshStandardMaterial map={planetTexture} />

				{/* оси координат для ориентации */}
				{/* <primitive object={new AxesHelper(planetsSettings.saturn.size * 1.5)} /> */}
			</mesh>

			{label}

			{/* Кольцо */}
			<mesh
				ref={ringRef}
				rotation={[
					0,
					0,
					appContent?.settings?.planetsSettings?.saturn?.tilt || 0,
				]}
			>
				<SaturnParticleRing innerRadius={3} outerRadius={4} segments={500} />
			</mesh>
		</group>
	)
}
