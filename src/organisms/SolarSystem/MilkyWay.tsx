import { useLoader } from "@react-three/fiber"
import { DoubleSide, TextureLoader } from "three"

export const MilkyWay = () => {
	const texture = useLoader(TextureLoader, "./textures/stars-milky-way.jpg")

	return (
		<mesh>
			<sphereGeometry args={[500, 64, 64]} />
			<meshBasicMaterial
				transparent
				opacity={0.7}
				map={texture}
				side={DoubleSide}
			/>
		</mesh>
	)
}
