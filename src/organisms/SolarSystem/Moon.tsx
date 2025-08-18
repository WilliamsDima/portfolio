import { useRef } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { TextureLoader, Mesh } from "three"
import { useAppSelector } from "@hooks/useStore"

export const Moon = () => {
	const moonRef = useRef<Mesh>(null)

	const { appContent } = useAppSelector(store => store.app)

	const texture = useLoader(
		TextureLoader,
		appContent?.settings?.solarSettings?.moon?.textureUrl
	)

	useFrame(({ clock }) => {
		const t = clock.getElapsedTime()

		// вращение Луны вокруг планеты
		if (moonRef.current) {
			moonRef.current.rotation.y = t * 1.5 // скорость орбиты Луны
		}
	})

	return (
		<group ref={moonRef}>
			<mesh
				position={[appContent?.settings?.solarSettings?.moon?.size + 2, 0, 0]}
			>
				<sphereGeometry
					args={[appContent?.settings?.solarSettings?.moon?.size, 32, 32]}
				/>
				<meshStandardMaterial map={texture} />
			</mesh>
		</group>
	)
}
