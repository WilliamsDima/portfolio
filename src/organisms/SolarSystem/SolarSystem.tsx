import React, { FC, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { MilkyWay } from "./MilkyWay"
import { Meteors } from "./Meteors"
import { Planet } from "./Planet"
import { OrbitPath } from "./OrbitPath"
import { Sun } from "./Sun"
import * as THREE from "three"
import { useAppSelector } from "@hooks/useStore"

const CameraAnimation: FC = () => {
	const { camera } = useThree()
	const controlsRef = useRef(null)
	const startPos = useRef(camera.position.clone())
	const startTime = useRef(performance.now())
	const [animating, setAnimating] = useState(true)

	useFrame(() => {
		if (!animating) return

		const elapsed = performance.now() - startTime.current
		let t = Math.min(elapsed / 5000, 1)

		// плавное замедление в конце
		t = t * (2 - t) // ease-out

		camera.position.lerpVectors(
			startPos.current,
			new THREE.Vector3(...[5, 10, 50]),
			t
		)
		camera.lookAt(0, 0, 0)

		if (elapsed >= 5000) {
			setAnimating(false)
			if (controlsRef.current) controlsRef.current.enabled = true
		}
	})

	return (
		<OrbitControls
			ref={controlsRef}
			enabled={!animating}
			minDistance={15} // минимальная дистанция камеры от центра
			maxDistance={1300} // максимальная дистанция
		/>
	)
}

const SolarSystem = () => {
	const [starsCount] = useState(20000)

	const { appContent } = useAppSelector(store => store.app)

	return (
		<Canvas camera={{ position: [0, 40, 1400], fov: 60 }}>
			{/* Показывает FPS и нагрузку */}
			{/* <Stats /> */}

			<ambientLight intensity={0.3} />
			<pointLight position={[0, 0, 0]} intensity={2} />

			<CameraAnimation />

			<MilkyWay />
			<Meteors />
			<Stars
				radius={400}
				depth={60}
				count={starsCount}
				saturation={10}
				factor={7}
				fade
				speed={1}
			/>

			<Sun />

			{appContent?.settings?.planetsSettings &&
				Object.keys(appContent.settings.planetsSettings).map((key, i) => {
					const planet = appContent.settings.planetsSettings[key]
					return (
						<React.Fragment key={i}>
							<OrbitPath distance={planet.distance} />
							<Planet planet={planet} />
						</React.Fragment>
					)
				})}
		</Canvas>
	)
}

export default SolarSystem
