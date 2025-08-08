import "./GlobalLoading.scss"

const GlobalLoading = () => {
	return (
		<div className='loading'>
			<div className='solar'>
				<i className='mercury'></i>
				<i className='venus'></i>
				<i className='earth'></i>
				<i className='mars'></i>
				<i className='belt'></i>
				<i className='jupiter'></i>
				<i className='saturn'></i>
				<i className='uranus'></i>
				<i className='neptune'></i>
			</div>

			<div className='loader'>
				<span>&lt;</span>
				<span>LOADING</span>
				<span>/&gt;</span>
			</div>
		</div>
	)
}

export default GlobalLoading
