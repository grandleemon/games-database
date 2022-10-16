import React, {FC, useEffect, useState} from 'react';
import styles from './index.module.scss'
import GameCard from "../../components/GameCard/GameCard";
import Loader from "../../components/Loader/Loader";
import Masonry from "react-masonry-css";
import {useInView} from "react-intersection-observer";
import {IGameCard} from "../../models/gamecard";
import {useAppDispatch, useAppSelector} from "../../store";
import {fetchMoreGamesThunk, getGamesThunk} from "../../store/features/games/gamesSlice";
import {gamesSelector} from "../../store/features/games";

const Homepage: FC = () => {
    const { ref, inView, entry } = useInView({
        rootMargin: '50px'
    });
    const dispatch = useAppDispatch()
    const { games, initialLoading, loadingMore, page } = useAppSelector(gamesSelector)

    useEffect(() => {
        dispatch(getGamesThunk())
    }, [])

    useEffect(() => {
        if(inView) fetchMore()
    }, [inView])

    const fetchMore = () => {
        dispatch(fetchMoreGamesThunk(page))
    }

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 1
    };

    return (
        <div className={styles.homepage}>
            <div className={styles.heading}>
                <h1>New and trending</h1>
                <p>Based on player counts and release date</p>
            </div>
            <div className={styles.cardsWrapper}>
                <div className={`${styles.loader} ${!initialLoading && styles.loaded}`}>
                    {initialLoading && <Loader/>}
                </div>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className={`${styles.cards} ${(!initialLoading && !loadingMore) && styles.cardsFetched}`}
                    columnClassName={`${styles.cardsColumn}`}>
                    {games?.map((item: IGameCard) => (
                        <GameCard key={item.id}
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
                {!initialLoading && <div className={styles.hiddenLoadMore} ref={ref}></div>}
                {loadingMore && <div className={styles.loadingMore}>
                    <Loader />
                </div>}
            </div>
        </div>
    );
};

export default Homepage;