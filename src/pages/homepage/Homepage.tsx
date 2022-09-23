import React, {FC, useEffect, useState} from 'react';
import styles from './Homepage.module.scss'
import GameCard, {IGame} from "../../components/GameCard/GameCard";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import {useAppDispatch} from "../../store";
import {setCount} from "../../store/features/games";

const Homepage: FC = () => {
    const [games, setGames] = useState([])
    const dispatch = useAppDispatch()

    const {isLoading, error, data} = useQuery(['all games'],
        () => axios.get(`${import.meta.env.VITE_API_URL}games?key=${import.meta.env.VITE_API_KEY}&page_size=40`))

    useEffect(() => {
        if(data) {
            setGames(data?.data?.results)
            dispatch(setCount(data?.data?.count))
        }
    }, [data])

    return (
        <div className={styles.homepage}>
            <div className={styles.heading}>
                <h1>New and trending</h1>
                <p>Based on player counts and release date</p>
            </div>

            <div className={styles.cardsWrapper}>
                <div className={`${styles.loader} ${data && styles.loaded}`}>
                    {isLoading && <Loader/>}
                </div>

                <div className={`${styles.cards} ${data && styles.cardsFetched}`}>
                    <div className={styles.cardsColumn}>
                        {games?.slice(0, 10).map((item: IGame) => (
                            <GameCard key={item.id}
                                      added={item.added}
                                      name={item.name}
                                      background_image={item.background_image}
                                      metacritic={item.metacritic}
                                      platforms={item.platforms}
                            />
                        ))}
                    </div>
                    <div className={styles.cardsColumn}>
                        {games?.slice(10, 20).map((item: IGame) => (
                            <GameCard key={item.id}
                                      added={item.added}
                                      name={item.name}
                                      background_image={item.background_image}
                                      metacritic={item.metacritic}
                                      platforms={item.platforms}
                            />
                        ))}
                    </div>
                    <div className={styles.cardsColumn}>
                        {games?.slice(20, 30).map((item: IGame) => (
                            <GameCard key={item.id}
                                      added={item.added}
                                      name={item.name}
                                      background_image={item.background_image}
                                      metacritic={item.metacritic}
                                      platforms={item.platforms}
                            />
                        ))}
                    </div>
                    <div className={styles.cardsColumn}>
                        {games?.slice(30, 40).map((item: IGame) => (
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
            </div>


        </div>
    );
};

export default Homepage;