import { FC, ReactNode } from "react"
import "./Layout.scss"

type Props = {
	children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
	return (
		<div className='page'>
			<div className='content'>{children}</div>
		</div>
	)
}

export default Layout
