import { useFrame, useLoader } from "@react-three/fiber"
import { FC, useRef } from "react"
import { Group, TextureLoader } from "three"
import { Moon } from "./Moon"

type Props = {
	textureUrl: string
	distance: number
	size: number
	orbitSpeed: number
	rotationSpeed: number
	tilt: number
	moon?: boolean
}

export const Planet: FC<Props> = ({
	textureUrl,
	distance,
	size,
	orbitSpeed,
	rotationSpeed,
	tilt = 0,
	moon,
}) => {
	const planetRef = useRef<Group>(null)

	const texture = useLoader(TextureLoader, textureUrl)

	useFrame(({ clock }) => {
		const t = clock.getElapsedTime()
		const angle = t * orbitSpeed

		// орбита планеты вокруг Солнца
		planetRef.current.position.x = Math.cos(angle) * distance
		planetRef.current.position.z = Math.sin(angle) * distance

		// вращение планеты вокруг своей оси
		planetRef.current.rotation.y += rotationSpeed
	})
	return (
		<group ref={planetRef}>
			<mesh rotation={[0, 0, tilt]}>
				<sphereGeometry args={[size, 32, 32]} />
				<meshStandardMaterial map={texture} />

				{/* оси координат для ориентации */}
				{/* <primitive object={new AxesHelper(size * 1.5)} /> */}
				{/* <axesHelper args={[size * 1.5]} /> */}
			</mesh>

			{moon && <Moon />}
		</group>
	)
}
