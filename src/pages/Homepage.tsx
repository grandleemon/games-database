import React, {FC, useEffect, useState} from 'react';
import styles from './../components/homepage/Homepage.module.scss'
import GameCard, {IGame} from "../components/GameCard/GameCard";
import Loader from "../components/Loader/Loader";
import {gameApi} from '../api'
import Masonry from "react-masonry-css";
import {useInView} from "react-intersection-observer";

const Homepage: FC = () => {
    const { ref, inView, entry } = useInView({
        rootMargin: '50px'
    });
    const [games, setGames] = useState<any>([])
    const [page, setPage] = useState(2)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        gameApi.getGames()
            .then(({data, error}: any) => {
                setIsLoading(false)
                setGames(data.results)
            })
            .catch(error => console.error(error))
    }, [])

    useEffect(() => {
        console.log(games)
    }, [games])

    // const {isLoading, error, data} = useQuery(['all games'],
    //     () => gameApi.getGames(), {
    //         onSuccess: (data) => {
    //             console.log(data)
    //             setPage(page => page + 1)
    //             setGames(data?.data.results)
    //             dispatch(setCount(data?.data.count))
    //         }
    //     })

    useEffect(() => {
        if(inView) fetchMore()
    }, [inView])

    const fetchMore = () => {
        setIsLoadingMore(true)
        gameApi.getGames(40, page)
            .then(({data, error}: any) => {
                setIsLoadingMore(false)
                setPage(page => page + 1)
                setGames([...games, ...data?.results])
                console.log(data)
            })
            .catch(err => console.error(err))
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
                <div className={`${styles.loader} ${!isLoading && styles.loaded}`}>
                    {isLoading && <Loader/>}
                </div>

                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className={`${styles.cards} ${(!isLoading && !isLoadingMore) && styles.cardsFetched}`}
                    columnClassName={`${styles.cardsColumn}`}>
                    {games?.map((item: IGame) => (
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

                {!isLoading && <div className={styles.hiddenLoadMore} ref={ref}></div>}
                {isLoadingMore && <div className={styles.loadingMore}>
                    <Loader />
                </div>}
            </div>


        </div>
    );
};

export default Homepage;