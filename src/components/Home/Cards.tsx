import styles from './Cards.module.scss'
import Loader from '../Loader/Loader'
import Masonry from 'react-masonry-css'
import { IGameCard } from '../../models/gamecard'
import GameCard from '../GameCard/GameCard'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useAppDispatch, useAppSelector } from '../../store'
import { gamesSelector } from '../../store/features/games'
import {
	fetchMoreGamesThunk,
	getGamesThunk
} from '../../store/features/games/gamesSlice'

const Cards = () => {
	const { ref, inView } = useInView({
		rootMargin: '50px'
	})
	const dispatch = useAppDispatch()
	const { games, initialLoading, loadingMore, page } =
		useAppSelector(gamesSelector)

	useEffect(() => {
		dispatch(getGamesThunk())
	}, [])

	useEffect(() => {
		if (inView) fetchMore()
	}, [inView])

	const fetchMore = () => {
		dispatch(fetchMoreGamesThunk(page))
	}

	const breakpointColumnsObj = {
		default: 4,
		1300: 3,
		1024: 2,
		768: 2
	}

	return (
		<div className={styles.cardsWrapper}>
			<div className={`${styles.loader} ${!initialLoading && styles.loaded}`}>
				{initialLoading && <Loader />}
			</div>
			<Masonry
				breakpointCols={breakpointColumnsObj}
				className={`${styles.cards} ${
					!initialLoading && !loadingMore && styles.cardsFetched
				}`}
				columnClassName={`${styles.cardsColumn}`}
			>
				{games?.map((item: IGameCard) => (
					<GameCard
						key={item.id}
						added={item.added}
						name={item.name}
						background_image={item.background_image}
						metacritic={item.metacritic}
						platforms={item.platforms}
						id={item.id}
						released={item.released}
						genres={item.genres}
					/>
				))}
			</Masonry>
			{!initialLoading && (
				<div className={styles.hiddenLoadMore} ref={ref}></div>
			)}
			{loadingMore && (
				<div className={styles.loadingMore}>
					<Loader />
				</div>
			)}
		</div>
	)
}

export default Cards
