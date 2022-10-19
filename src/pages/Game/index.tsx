import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import 'react-image-lightbox/style.css'
import LightboxGallery from '../../components/Game/LightboxGallery'
import { GameDetails } from '../../components/Game'
import styles from './index.module.scss'
// ? case error
import Breadcrumbs from './../../components/breadcrumbs/Breadcrumbs'
import { useAppDispatch, useAppSelector } from '../../store'
import { getGameDetailsThunk } from '../../store/features/games/gamesSlice'
import { gamesSelector } from '../../store/features/games'

const Game: FC = () => {
	const { id } = useParams()
	const dispatch = useAppDispatch()
	const { currentGame } = useAppSelector(gamesSelector)
	const { details, screenshots, loading } = currentGame
	const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
	const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false)

	useEffect(() => {
		if (id) dispatch(getGameDetailsThunk(id))
	}, [])

	return (
		<div>
			<div
				className={styles.loader}
				style={{
					opacity: loading ? '1' : '0',
					pointerEvents: loading ? 'auto' : 'none'
				}}
			>
				<Loader />
			</div>
			{details && details.name && <Breadcrumbs currentPage={details.name} />}
			{details && (
				<GameDetails
					currentGame={details}
					gameScreenshots={screenshots}
					imageIndex={currentImageIndex}
					openLighbox={setIsLightboxOpen}
					setImageIndex={setCurrentImageIndex}
				/>
			)}
			{details && details.background_image && (
				<div className={styles.gameBackgroundImageWrapper}>
					<div
						className={styles.gameBackgroundImage}
						style={{
							backgroundImage: `linear-gradient(rgba(15, 15, 15, 0), rgb(21, 21, 21)), linear-gradient(rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)), url(${details.background_image})`,
							opacity: `${loading ? '0' : '1'}`
						}}
					></div>
				</div>
			)}
			{isLightboxOpen && (
				<LightboxGallery
					screenshots={screenshots}
					currentIndex={currentImageIndex}
					setCurrentIndex={setCurrentImageIndex}
					closeLightbox={setIsLightboxOpen}
				/>
			)}
		</div>
	)
}

export default Game
