import React, {FC, useEffect, useRef, useState} from 'react';
import styles from '../components/homepage/Homepage.module.scss'
import GameCard, {IGame} from "../components/GameCard/GameCard";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import {useAppDispatch} from "../store";
import {setCount} from "../store/features/games";
import {Masonry} from "../components/Masonry/Masonry";
import Isotope from 'isotope-layout';

const Homepage: FC = () => {
    const [games, setGames] = useState([])
    const dispatch = useAppDispatch()
    const isotope = useRef<Isotope | null>(null)

    useEffect(() => {
        isotope.current = new Isotope('.cards', {
            itemSelector: '.card__wrapper',
            layoutMode: 'masonry',
            masonry: {
                columnWidth: 104,
                gutter: 20,
            },
        })

        // cleanup
        return () => isotope?.current?.destroy()
    }, [games])

    const {isLoading, error, data} = useQuery(['all games'],
        () => axios.get(`${import.meta.env.VITE_API_URL}games?key=${import.meta.env.VITE_API_KEY}&page_size=38`), {
            refetchOnWindowFocus: false
        })

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

                <div className={`cards ${styles.cards} ${data && styles.cardsFetched}`} ref={isotope}>

                    {/*<Masonry dataArray={games}*/}
                    {/*         columnCount={4}*/}
                    {/*         ChildsElement={GameCard}*/}
                    {/*/>*/}

                        {games?.map((item: IGame) => (
                            <GameCard key={item.id}
                                      added={item.added}
                                      name={item.name}
                                      background_image={item.background_image}
                                      metacritic={item.metacritic}
                                      platforms={item.platforms}
                                      ref={isotope}
                            />
                        ))}



                        {/*<div className={styles.cardsColumn}>*/}
                        {/*    {games?.map((item: IGame) => (*/}
                        {/*        <GameCard key={item.id}*/}
                        {/*                  added={item.added}*/}
                        {/*                  name={item.name}*/}
                        {/*                  background_image={item.background_image}*/}
                        {/*                  metacritic={item.metacritic}*/}
                        {/*                  platforms={item.platforms}*/}
                        {/*        />*/}
                        {/*    ))}*/}
                        {/*</div>*/}

                </div>
            </div>


        </div>
    );
};

export default Homepage;