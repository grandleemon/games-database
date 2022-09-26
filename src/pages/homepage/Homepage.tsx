import React, {FC, useEffect, useState} from 'react';
import styles from './Homepage.module.scss'
import GameCard, {IGame} from "../../components/GameCard/GameCard";
import {useQuery} from "@tanstack/react-query";
import Loader from "../../components/Loader/Loader";
import {useAppDispatch} from "../../store";
import {setCount} from "../../store/features/games";
import {gameApi} from './../../api/index'

const Homepage: FC = () => {
    const [games, setGames] = useState<any>([])
    const [page, setPage] = useState(1)
    const dispatch = useAppDispatch()

    const {isLoading, error, data} = useQuery(['all games'],
        () => gameApi.getGames(), {
            onSuccess: (data) => {
                setPage(page => page + 1)
                setGames(data?.data.results)
                dispatch(setCount(data?.data.count))
            }
        })

    const fetchMore = () => {
        gameApi.getGames(40, page).then(({data}: any) => {
            setPage(page => page + 1)
            setGames([...games, ...data?.results])
            console.log(data)
        })
    }

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

                <div className={`${styles.cards} ${!isLoading && styles.cardsFetched}`}>
                    <div className={styles.cardsColumn}>
                        {games?.map((item: IGame) => (
                            <GameCard key={item.id}
                                      added={item.added}
                                      name={item.name}
                                      background_image={item.background_image}
                                      metacritic={item.metacritic}
                                      platforms={item.platforms}
                            />
                        ))}
                    </div>
                </div>
                <button onClick={fetchMore}>load more</button>
            </div>


        </div>
    );
};

export default Homepage;