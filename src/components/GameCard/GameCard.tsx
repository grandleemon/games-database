import React, {FC, useState} from 'react';
import {Link} from "react-router-dom";
import { ImWindows8 } from 'react-icons/im'
import { IoLogoPlaystation } from 'react-icons/io'
import { AiOutlinePlus } from 'react-icons/ai'
import { HiOutlineGift } from 'react-icons/hi'
import { FaXbox } from 'react-icons/fa'
import imgPlaceholder from './../../assets/images/img-placeholder.jpg'
import styles from './GameCard.module.scss'

export interface IGame {
        id?: number
        name: string
        background_image: string
        metacritic: number
        added: number
        platforms: {platform: {slug: string}}[]
}

const GameCard: FC<IGame> = (
    {added, platforms = [], name, metacritic, background_image }: IGame
) => {
    return (
        <div className={`${styles.cardWrapper}`}>
            <div className={styles.wrapper}>
                <div className={styles.cardMediaWrapper}>
                    <img src={background_image ? background_image  : imgPlaceholder}
                         alt="game image/video"/>
                </div>

                <div className={styles.cardContent}>
                    <div className={styles.platformsAndScore}>
                        <div className={styles.gamePlatforms}>
                            {platforms.map(item => (
                                <>
                                    {item.platform.slug.includes("pc") && <ImWindows8 />}
                                    {item.platform.slug.includes('playstation5')
                                        ? <IoLogoPlaystation />
                                        : item.platform.slug.includes('playstation4')
                                            ? <IoLogoPlaystation />
                                            : item.platform.slug.includes('playstation3')
                                                ? <IoLogoPlaystation />
                                                : null}
                                    {item.platform.slug.includes("xbox-series-x") && <FaXbox />
                                        || item.platform.slug.includes("xbox-360") && <FaXbox />}
                                </>
                            ))}
                        </div>
                        <div className={styles.gameScore}>
                            {metacritic}
                        </div>
                    </div>

                    <div className={styles.gameTitle}>
                        <Link to={`/games/${name?.toLowerCase().replace(/\s/gi, "-")}`}>{name}</Link>
                    </div>

                    <div className={styles.cardButtons}>
                        <button className={styles.buttonAdd}>
                            <AiOutlinePlus />
                            {added?.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')}
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