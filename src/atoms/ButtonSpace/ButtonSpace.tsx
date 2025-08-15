import React, { ButtonHTMLAttributes, FC } from "react"
import styles from "./ButtonSpace.module.scss"
import cn from "classnames"

const stars = [
	{
		left: "119.273px",
		top: "18.0747px",
		delay: "3.37051s",
		scale: "0.196521",
	},
	{
		left: "166.774px",
		top: "47.4519px",
		delay: "3.03913s",
		scale: "0.33078",
	},
	{
		left: "238.677px",
		top: "19.6434px",
		delay: "3.85796s",
		scale: "1.29037",
	},
	{
		left: "22.2022px",
		top: "4.69534px",
		delay: "4.9415s",
		scale: "1.82231",
	},
	{
		left: "206.74px",
		top: "40.7685px",
		delay: "1.59195s",
		scale: "1.01375",
	},
	{
		left: "241.531px",
		top: "14.2516px",
		delay: "1.67616s",
		scale: "0.811597",
	},
	{
		left: "14.754px",
		top: "25.2924px",
		delay: "0.0348248s",
		scale: "0.102529",
	},
	{
		left: "220.444px",
		top: "43.9803px",
		delay: "1.5106s",
		scale: "0.16088",
	},
	{
		left: "95.948px",
		top: "54.8942px",
		delay: "3.18662s",
		scale: "1.7822",
	},
	{
		left: "30.3484px",
		top: "36.5984px",
		delay: "4.30868s",
		scale: "1.16326",
	},
	{
		left: "184.622px",
		top: "20.0923px",
		delay: "2.83829s",
		scale: "1.27781",
	},
	{
		left: "142.1px",
		top: "22.3542px",
		delay: "2.73988s",
		scale: "1.62715",
	},
	{
		left: "145.079px",
		top: "6.97553px",
		delay: "0.0408754s",
		scale: "0.468075",
	},
	{
		left: "6.67886px",
		top: "38.4849px",
		delay: "3.84019s",
		scale: "0.272217",
	},
	{
		left: "201.17px",
		top: "39.9168px",
		delay: "2.93587s",
		scale: "0.521258",
	},
	{
		left: "224.215px",
		top: "42.9903px",
		delay: "0.895495s",
		scale: "0.0458902",
	},
	{
		left: "42.2308px",
		top: "9.78383px",
		delay: "4.58407s",
		scale: "0.0422065",
	},
	{
		left: "91.2734px",
		top: "14.0408px",
		delay: "2.05927s",
		scale: "0.11997",
	},
	{
		left: "35.6985px",
		top: "52.6403px",
		delay: "3.07343s",
		scale: "0.672992",
	},
	{
		left: "76.4191px",
		top: "48.453px",
		delay: "2.35679s",
		scale: "1.46957",
	},
	{
		left: "184.503px",
		top: "4.18267px",
		delay: "1.43409s",
		scale: "0.606616",
	},
	{
		left: "221.039px",
		top: "54.2493px",
		delay: "2.92356s",
		scale: "0.638665",
	},
	{
		left: "185.612px",
		top: "44.3px",
		delay: "1.36401s",
		scale: "1.65012",
	},
	{
		left: "154.027px",
		top: "45.9848px",
		delay: "3.723s",
		scale: "1.4118",
	},
	{
		left: "220.591px",
		top: "4.95194px",
		delay: "0.363098s",
		scale: "0.52369",
	},
	{
		left: "236.028px",
		top: "11.1663px",
		delay: "3.67493s",
		scale: "0.956478",
	},
	{
		left: "110.241px",
		top: "20.2684px",
		delay: "2.94906s",
		scale: "1.2193",
	},
	{
		left: "12.602px",
		top: "19.8836px",
		delay: "4.072s",
		scale: "1.49026",
	},
	{
		left: "30.0911px",
		top: "37.9746px",
		delay: "1.02002s",
		scale: "1.41008",
	},
	{
		left: "62.3096px",
		top: "9.64604px",
		delay: "3.9445s",
		scale: "0.231214",
	},
	{
		left: "44.7189px",
		top: "32.4307px",
		delay: "4.78921s",
		scale: "0.359408",
	},
	{
		left: "191.866px",
		top: "27.151px",
		delay: "1.34451s",
		scale: "1.13484",
	},
	{
		left: "47.6744px",
		top: "3.00604px",
		delay: "1.04567s",
		scale: "0.682023",
	},
	{
		left: "98.6225px",
		top: "49.6115px",
		delay: "2.41384s",
		scale: "1.96254",
	},
	{
		left: "57.4785px",
		top: "29.6588px",
		delay: "3.3569s",
		scale: "1.53118",
	},
	{
		left: "13.2213px",
		top: "24.538px",
		delay: "1.69582s",
		scale: "1.6236",
	},
	{
		left: "131.656px",
		top: "31.1837px",
		delay: "1.29918s",
		scale: "1.84486",
	},
	{
		left: "56.9067px",
		top: "51.9904px",
		delay: "4.74375s",
		scale: "0.749788",
	},
	{
		left: "82.8361px",
		top: "54.3876px",
		delay: "1.28648s",
		scale: "0.566118",
	},
	{
		left: "193.213px",
		top: "43.9428px",
		delay: "0.390178s",
		scale: "1.411",
	},
]

const shootingStars = [
	{ delay: "1.2122s", cls: "shootingStar1" },
	{ delay: "0.777895s", cls: "shootingStar2" },
	{ delay: "4.90483s", cls: "shootingStar3" },
	{ delay: "3.66012s", cls: "shootingStar4" },
]

type Props = {} & ButtonHTMLAttributes<HTMLButtonElement>

const ButtonSpace: FC<Props> = props => {
	return (
		<div className={styles.btnContainer}>
			<button {...props}>
				<span>Let's Go to Space</span>

				{/* Звезды */}
				{stars.map((s, i) => (
					<div
						key={i}
						style={{
							position: "absolute",
							left: s.left,
							top: s.top,
							animationDelay: s.delay,
							transform: `scale(${s.scale})`,
						}}
						className={styles.star}
					/>
				))}

				{/* Падающие звезды */}
				{shootingStars.map((s, i) => (
					<div
						key={i}
						style={{ animationDelay: s.delay }}
						className={cn(styles.shootingStar, styles[s.cls])}
					/>
				))}
			</button>
		</div>
	)
}

export default ButtonSpace
