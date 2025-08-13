import React, { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { MilkyWay } from "./MilkyWay"
import { Meteors } from "./Meteors"
import { Planet } from "./Planet"
import { OrbitPath } from "./OrbitPath"
import { Saturn } from "./Saturn"
import { Sun } from "./Sun"
import { planetsSettings } from "./settings"

const SolarSystem = () => {
	const [starsCount] = useState(20000)
	return (
		<Canvas camera={{ position: [0, 40, 130], fov: 60 }}>
			<ambientLight intensity={0.3} />
			<pointLight position={[0, 0, 0]} intensity={2} />
			<OrbitControls />

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
			<Saturn />

			{Object.keys(planetsSettings).map((key, i) => {
				const planet = planetsSettings[key]
				return (
					<React.Fragment key={i}>
						<OrbitPath distance={planet.distance} />
						<Planet
							textureUrl={planet.textureUrl}
							distance={planet.distance}
							size={planet.size}
							orbitSpeed={planet.orbitSpeed}
							rotationSpeed={planet.rotationSpeed}
							tilt={planet.tilt}
							moon={key === "earth"}
						/>
					</React.Fragment>
				)
			})}
		</Canvas>
	)
}

export default SolarSystem
