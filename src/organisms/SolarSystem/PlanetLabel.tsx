import { FC } from "react"
import { Group } from "three"
import { PlanetType } from "./settings"
import { Html } from "@react-three/drei"
import styles from "./Planet.module.scss"

type Props = {
	selected: Group | null
	planet: PlanetType
	onClick: () => void
}

export const PlanetLabel: FC<Props> = ({ selected, planet, onClick }) => {
	return (
		<group>
			{/* палочка-указатель */}
			{(() => {
				const labelOffset = Math.max(3, planet.size * 0.9) // высота палочки над планетой

				const yMid = planet.size + labelOffset / 2 // середина для позиционирования цилиндра

				return (
					<>
						<mesh position={[0, yMid, 0]}>
							{/* радиус палочки подбери на вкус (0.03–0.08) */}
							<cylinderGeometry args={[0.05, 0.05, labelOffset, 12]} />
							<meshBasicMaterial color='white' />

							{selected && (
								<Html
									position={[0, 3, 0]}
									distanceFactor={20}
									transform // делаем Html частью сцены, а не абсолютным
									sprite // Html всегда смотрит на камеру
								>
									<div className={styles.planetText} onClick={onClick}>
										{planet.label}
									</div>
								</Html>
							)}
						</mesh>

						{!selected && (
							<Html
								position={[0, 5, 0]}
								distanceFactor={20}
								transform // делаем Html частью сцены, а не абсолютным
								sprite // Html всегда смотрит на камеру
							>
								<div
									id='planetText'
									className={styles.planetText}
									onClick={onClick}
								>
									{planet.label}
								</div>
							</Html>
						)}
					</>
				)
			})()}
		</group>
	)
}
