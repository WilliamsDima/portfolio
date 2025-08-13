import { DoubleSide } from "three"

export const OrbitPath = ({ distance }) => {
	return (
		<mesh rotation={[-Math.PI / 2, 0, 0]}>
			<ringGeometry args={[distance - 0.02, distance + 0.02, 128]} />
			<meshBasicMaterial
				color='white'
				side={DoubleSide}
				transparent
				opacity={0.2}
			/>
		</mesh>
	)
}
