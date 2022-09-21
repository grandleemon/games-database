import React, {FC, useEffect} from 'react';
import styles from './Homepage.module.scss'
import GameCard from "../../components/GameCard/GameCard";
import {useLoaderData} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store";
import {gamesSelector, setGames} from "../../store/features/games";

interface IGame {
    id: number
}

const array = [1,2,3,4]

const Homepage: FC = () => {
    const data = useLoaderData();
    const dispatch = useAppDispatch()
    const games = useAppSelector(gamesSelector)

    useEffect(() => {
        dispatch(setGames(data))
    }, [])

    return (
        <div className={styles.homepage}>
            <div className={styles.heading}>
                <h1>New and trending</h1>
                <p>Based on player counts and release date</p>
            </div>

            <div className={styles.cards}>
                {games?.games?.results?.map((item: IGame) => (
                    <GameCard key={item.id}/>
                ))}
            </div>
        </div>
    );
};

export default Homepage;