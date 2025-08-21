import { useFrame, useLoader, useThree } from "@react-three/fiber"
import { FC, useEffect, useRef, useState } from "react"
import { Group, TextureLoader } from "three"
import { Moon } from "./Moon"
import { PlanetType } from "./settings"
import * as THREE from "three"
import { useActions } from "@hooks/useActions"
import { useAppSelector } from "@hooks/useStore"
import { PlanetLabel } from "./PlanetLabel"
import { Saturn } from "./Saturn"

type Props = {
	planet: PlanetType
}

export const Planet: FC<Props> = ({ planet }) => {
	const { setSelectedPlanet, setModalPage } = useActions()
	const planetRef = useRef<Group>(null)
	const { camera } = useThree()

	const { selectedPlanet, appContent } = useAppSelector(store => store.app)

	const [selected, setSelected] = useState<Group | null>(null)

	const onSelect = (target: Group) => {
		if (!target) return
		setSelectedPlanet(planet)

		setSelected(prev => {
			setModalPage(prev && prev === target ? null : planet.modalPage)
			return prev && prev === target ? null : target
		})
	}

	const texture = useLoader(TextureLoader, planet.textureUrl)

	useFrame(({ clock }) => {
		const t = clock.getElapsedTime()
		const angle = (t * planet.orbitSpeed) / appContent.settings.globalSpeed

		// орбита планеты вокруг Солнца
		planetRef.current.position.x = Math.cos(angle) * planet.distance
		planetRef.current.position.z = Math.sin(angle) * planet.distance

		// вращение планеты вокруг своей оси
		planetRef.current.rotation.y += planet.rotationSpeed

		if (selected) {
			const pos = selected.position.clone().add(new THREE.Vector3(15, 8, 15))
			camera.position.lerp(pos, 0.05)
			camera.lookAt(selected.position)
		}
	})

	useEffect(() => {
		if (!selected) {
			const home = new THREE.Vector3(0, 40, 1400)
			camera.position.lerp(home, 0.02)
			camera.lookAt(0, 0, 0)
		}
	}, [selected, camera])

	useEffect(() => {
		if (!selectedPlanet) {
			setSelected(null)
		}
	}, [selectedPlanet])

	return planet.name === "saturn" ? (
		<>
			<Saturn
				onClick={() => planet.label && onSelect(planetRef.current)}
				planetRef={planetRef}
				label={
					(selectedPlanet
						? selectedPlanet?.label === planet.label && !!planet.label
						: !!planet.label) && (
						<PlanetLabel
							onClick={() => planet.label && onSelect(planetRef.current)}
							planet={planet}
							selected={selected}
						/>
					)
				}
			/>
		</>
	) : (
		<group
			ref={planetRef}
			onClick={() => planet.label && onSelect(planetRef.current)}
			onPointerOver={
				planet.label
					? e => {
							e.stopPropagation()
							document.body.style.cursor = "pointer"
					  }
					: undefined
			}
			onPointerOut={
				planet.label
					? e => {
							e.stopPropagation()
							document.body.style.cursor = "pointer"
					  }
					: undefined
			}
		>
			<mesh rotation={[0, 0, planet.tilt]}>
				<sphereGeometry args={[planet.size, 32, 32]} />
				<meshStandardMaterial map={texture} />

				{/* оси координат для ориентации */}
				{/* <primitive object={new AxesHelper(size * 1.5)} /> */}
				{/* <axesHelper args={[size * 1.5]} /> */}
			</mesh>

			{(selectedPlanet
				? selectedPlanet?.label === planet.label && !!planet.label
				: !!planet.label) && (
				<PlanetLabel
					onClick={() => planet.label && onSelect(planetRef.current)}
					planet={planet}
					selected={selected}
				/>
			)}
			{!!planet.moon && <Moon />}
		</group>
	)
}
