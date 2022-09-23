import React, {FC, useState} from 'react';
import {Link} from "react-router-dom";
import { ImWindows8 } from 'react-icons/im'
import { IoLogoPlaystation } from 'react-icons/io'
import { AiOutlinePlus } from 'react-icons/ai'
import { HiOutlineGift } from 'react-icons/hi'
import styles from './GameCard.module.scss'

export interface IGame {
    game: {
        id: number
        name: string
        background_image: string
        metacritic: number
        added: number
    }
}

const GameCard: FC<IGame> = ({game}: IGame ) => {

    return (
        <div className={`${styles.cardWrapper}`}>
            <div className={styles.wrapper}>
                <div className={styles.cardMediaWrapper}>
                    <img src={game?.background_image} alt="game image/video"/>
                </div>

                <div className={styles.cardContent}>
                    <div className={styles.platformsAndScore}>
                        <div className={styles.gamePlatforms}>
                            <ImWindows8 />
                            <IoLogoPlaystation />
                        </div>
                        <div className={styles.gameScore}>
                            {game.metacritic}
                        </div>
                    </div>

                    <div className={styles.gameTitle}>
                        <Link to='/games/stray'>{game.name}</Link>
                    </div>

                    <div className={styles.cardButtons}>
                        <button className={styles.buttonAdd}>
                            <AiOutlinePlus />
                            {game?.added?.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')}
                        </button>
                        <button className={styles.buttonWishlist}>
                            <HiOutlineGift />
                        </button>
                    </div>

                    <div className={`${styles.additionalInfo}`}>
                        <div className={styles.aboutGame}>
                            <div className={styles.aboutGameRow}>
                                <span>Release date:</span>
                                <p>Dec 31, 2022</p>
                            </div>
                            <div className={styles.aboutGameRow}>
                                <span>Genres:</span>
                                <p>Action, RPG</p>
                            </div>
                            <div className={styles.aboutGameRow}>
                                <span>Chart:</span>
                                <p>#10 Top 2022</p>
                            </div>
                        </div>

                        <div className={styles.infoButtons}>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameCard;