import { useFrame, useLoader } from "@react-three/fiber"
import { FC, useRef } from "react"
import { AxesHelper, TextureLoader } from "three"

type Props = {
	textureUrl: string
	distance: number
	size: number
	orbitSpeed: number
	rotationSpeed: number
	tilt: number
}

export const Planet: FC<Props> = ({
	textureUrl,
	distance,
	size,
	orbitSpeed,
	rotationSpeed,
	tilt = 0,
}) => {
	const planetRef = useRef<
		| {
				position: { x: number; z: number; y: number }
				rotation: { y: number }
		  }
		| undefined
	>(undefined)

	const texture = useLoader(TextureLoader, textureUrl)

	useFrame(({ clock }) => {
		const t = clock.getElapsedTime()
		const angle = t * orbitSpeed
		planetRef.current.position.x = Math.cos(angle) * distance
		planetRef.current.position.z = Math.sin(angle) * distance
		planetRef.current.rotation.y += rotationSpeed
	})

	return (
		<group ref={planetRef}>
			<mesh rotation={[0, 0, tilt]}>
				<sphereGeometry args={[size, 32, 32]} />
				<meshStandardMaterial map={texture} />

				<primitive object={new AxesHelper(size * 1.5)} />
			</mesh>
		</group>
	)
}
