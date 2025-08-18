import { Sphere } from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber"
import { Bloom, EffectComposer, GodRays } from "@react-three/postprocessing"
import { useEffect, useRef, useState } from "react"
import { Mesh, TextureLoader } from "three"
import { BlendFunction } from "postprocessing"
import { useAppSelector } from "@hooks/useStore"

export const Sun = () => {
	const [emissiveIntensity, setEmissiveIntensity] = useState(0)
	const sunRef = useRef<Mesh>(null)
	const texture = useLoader(TextureLoader, "./textures/sun.jpg")

	const { appContent } = useAppSelector(store => store.app)

	useFrame((_, delta) => {
		if (sunRef.current) {
			sunRef.current.rotation.y +=
				delta * appContent?.settings?.solarSettings?.sun?.rotationY // вращение солнца
		}
	})

	useEffect(() => {
		setEmissiveIntensity(
			appContent?.settings?.solarSettings?.sun?.emissiveIntensity
		)
	}, [appContent])

	return (
		<>
			<Sphere
				ref={sunRef}
				args={[appContent?.settings?.solarSettings?.sun?.size, 64, 64]}
			>
				<meshStandardMaterial
					map={texture}
					emissive='#fff3b0'
					emissiveIntensity={emissiveIntensity}
				/>
			</Sphere>

			<EffectComposer>
				<Bloom
					intensity={1}
					luminanceThreshold={0.1}
					luminanceSmoothing={0.4}
					blendFunction={BlendFunction.ADD}
				/>
				{sunRef.current && (
					<GodRays sun={sunRef.current} exposure={0.6} decay={0.95} blur />
				)}
			</EffectComposer>

			{/* источник света */}
			<directionalLight position={[5, 5, 5]} intensity={2} color='#fff3b0' />
		</>
	)
}
