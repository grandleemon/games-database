import React, {FC, useEffect, useState} from 'react';
import styles from './Homepage.module.scss'
import GameCard, {IGame} from "../../components/GameCard/GameCard";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../components/Loader/Loader";

const Homepage: FC = () => {
    const [games, setGames] = useState([])

    const {isLoading, error, data} = useQuery(['all games'],
        () => axios.get(`${import.meta.env.VITE_API_URL}games?key=${import.meta.env.VITE_API_KEY}`))

    useEffect(() => {
        console.log(data?.data?.results)
        if(data) {
            setGames(data?.data?.results)
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
                    {!data && <Loader/>}
                </div>

                <div className={`${styles.cards} ${data && styles.cardsFetched}`}>
                    <div className={styles.cardsColumn}>
                        {games?.map((item: IGame) => (
                            <GameCard key={item.id} game={item}/>
                        ))}
                    </div>

                </div>
            </div>


        </div>
    );
};

export default Homepage;