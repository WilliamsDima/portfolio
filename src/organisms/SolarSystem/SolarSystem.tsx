import React from "react"
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
	return (
		<Canvas camera={{ position: [0, 40, 130], fov: 60 }}>
			<ambientLight intensity={0.3} />
			<pointLight position={[0, 0, 0]} intensity={2} />
			<OrbitControls />

			<MilkyWay />
			<Meteors />
			<Stars
				radius={300}
				depth={60}
				count={20000}
				saturation={10}
				factor={7}
				fade
				speed={1}
			/>

			<Sun />
			<Saturn />

			{Object.values(planetsSettings).map((planet, i) => {
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
						/>
					</React.Fragment>
				)
			})}
		</Canvas>
	)
}

export default SolarSystem
