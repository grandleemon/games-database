import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import styles from './Game.module.scss'
import {
	DistributionMeta,
	DistributionStats,
	GameAbout,
	GamePlatforms,
	GameScreenshots
} from './'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { IGame, IScreenshot } from '../../models/api/game'

type IProps = {
	currentGame: IGame
	openLighbox: Dispatch<SetStateAction<boolean>>
	setImageIndex: Dispatch<SetStateAction<number>>
	imageIndex: number
	gameScreenshots: IScreenshot[]
}

const GameDetails: FC<IProps> = ({
	currentGame,
	openLighbox,
	setImageIndex,
	imageIndex,
	gameScreenshots
}) => {
	const [hoveredMeta, setHoveredMeta] = useState<string>('')

	const checkMetaScore = (score: number) => {
		if (score) {
			if (score >= 80) {
				return { color: '#6dc849', borderColor: 'rgba(109,200,73,.4)' }
			}
			if (score < 80 && score >= 40)
				return { color: '#E67F35', borderColor: 'rgba(230,127,53,0.4)' }
			return { color: '#C81316', borderColor: 'rgba(200,19,22,0.4)' }
		}
	}

	const openLightbox = (idx: number) => {
		setTimeout(() => {
			openLighbox(true)
			setImageIndex(idx)
		}, 1)
	}

	return (
		<div className={styles.gameDetails}>
			<div className={styles.gameInfo}>
				<div className={styles.gameHead}>
					{currentGame.parent_platforms && (
						<div className={styles.headPlatforms}>
							<GamePlatforms platforms={currentGame.parent_platforms} />
						</div>
					)}
					<div>AVERAGE PLAYTIME: {currentGame?.playtime} HOURS</div>
				</div>
				<h1>{currentGame?.name}</h1>
				<div className={styles.totalGameRating}>
					<div className={styles.totalGameRatingText}>
						{currentGame?.ratings[0]?.title}
					</div>
					<div className={styles.ratingChart}>
						{currentGame?.ratings?.reduce((acc, next) => acc + next.count, 0)}{' '}
						ratings
					</div>
				</div>
				{currentGame?.ratings && (
					<div className={styles.ratingDistribution}>
						<DistributionStats
							ratings={currentGame.ratings}
							hoveredMeta={hoveredMeta}
							setHoveredMeta={setHoveredMeta}
						/>
						<div className={styles.distributionMeta}>
							<DistributionMeta
								ratings={currentGame.ratings}
								hoveredMeta={hoveredMeta}
								setHoveredMeta={setHoveredMeta}
							/>
						</div>
					</div>
				)}
				<div className={styles.gameDescription}>
					<h2>About</h2>

					{currentGame?.description && currentGame.description_raw && (
						<GameAbout
							description={currentGame.description}
							description_raw={currentGame.description_raw}
						/>
					)}
				</div>
				<div className={styles.gameMeta}>
					<div className={styles.gameMetaBlock}>
						<div className={styles.metaTitle}>Platforms</div>
						<div className={styles.metaText}>
							{currentGame?.platforms.map((item, i) => (
								<React.Fragment key={i}>
									<Link to={`/platforms/${item.platform.id}`}>
										{item.platform.name}
									</Link>
									{i !== currentGame?.platforms?.length - 1 ? ', ' : ''}
								</React.Fragment>
							))}
						</div>
					</div>
					{currentGame?.metacritic && (
						<div className={styles.gameMetaBlock}>
							<div className={styles.metaTitle}>Metacritic</div>
							<div className={styles.metaText}>
								<div
									className={`${styles.metaScore}`}
									style={checkMetaScore(currentGame?.metacritic)}
								>
									{currentGame?.metacritic}
								</div>
							</div>
						</div>
					)}
					<div className={styles.gameMetaBlock}>
						<div className={styles.metaTitle}>Genre</div>
						<div className={styles.metaText}>
							{currentGame?.genres.map((item, i) => (
								<React.Fragment key={i}>
									<Link to={`/genres/${item.id}`}>{item.name}</Link>
									{i !== currentGame?.genres?.length - 1 ? ', ' : ''}
								</React.Fragment>
							))}
						</div>
					</div>
					<div className={styles.gameMetaBlock}>
						<div className={styles.metaTitle}>Release date</div>
						<div className={styles.metaText}>
							{currentGame?.released
								? dayjs(currentGame?.released).format('MMM DD, YYYY')
								: 'TBA'}
						</div>
					</div>
					<div className={styles.gameMetaBlock}>
						<div className={styles.metaTitle}>Developer</div>
						<div className={styles.metaText}>
							{currentGame?.developers?.map((item, i) => (
								<React.Fragment key={i}>
									<Link to={`/developers/${item.id}`}>{item.name}</Link>
									{i !== currentGame?.developers?.length - 1 ? ', ' : ''}
								</React.Fragment>
							))}
						</div>
					</div>
					<div className={styles.gameMetaBlock}>
						<div className={styles.metaTitle}>Publisher</div>
						<div className={styles.metaText}>
							{currentGame?.publishers?.map((item, i) => (
								<React.Fragment key={i}>
									<Link key={i} to={`/publishers/${item.id}`}>
										{item.name}
									</Link>
									{i !== currentGame?.publishers?.length - 1 ? ', ' : ''}
								</React.Fragment>
							))}
						</div>
					</div>
					<div className={styles.gameMetaBlock}>
						<div className={styles.metaTitle}>Age rating</div>
						<div className={styles.metaText}>
							{currentGame?.esrb_rating?.name === 'Mature' && '17+ '}
							{currentGame?.esrb_rating?.name
								? currentGame?.esrb_rating?.name
								: 'Not rated'}
						</div>
					</div>
					<div className={`${styles.gameMetaBlock} ${styles.wideBlock}`}>
						<div className={styles.metaTitle}>Age rating</div>
						<div className={styles.metaText}>
							{currentGame?.tags?.map((item, i) => (
								<React.Fragment key={i}>
									<Link key={i} to={`/tags/${item.id}`}>
										{item.name}
									</Link>
									{i !== currentGame?.tags?.length - 1 ? ', ' : ''}
								</React.Fragment>
							))}
						</div>
					</div>
					<div className={`${styles.gameMetaBlock} ${styles.wideBlock}`}>
						<div className={styles.metaTitle}>Website</div>
						<div className={styles.metaText}>
							<a href={currentGame?.website} target='_blank'>
								{currentGame?.website}
							</a>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.gameMediaInfo}>
				<div className={styles.gameVideo}>
					<iframe
						width='100%'
						height='216'
						src='https://www.youtube.com/embed/VbIc2_FwReE?autoplay=1&mute=1&controls=0'
						title='YouTube video player'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
						allowFullScreen
					></iframe>
				</div>
				<div className={styles.gameScreenshots}>
					<GameScreenshots
						screenshots={gameScreenshots}
						openLightbox={openLightbox}
						currentImageIndex={imageIndex}
					/>
				</div>
			</div>
		</div>
	)
}

export default GameDetails
