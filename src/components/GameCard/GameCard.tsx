import React, {FC, useEffect, useState} from 'react';
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
    {added, platforms, name, metacritic, background_image }: IGame
) => {
    const [filteredPlatforms, setFilteredPlatforms] = useState<string[]>([])
    const temp: string[] = [];

    useEffect(() => {
        platforms.forEach(({platform}) => {
            if(temp?.includes(platform.slug.replace(/\d|-.*/gi, ""))){
                return
            } else {
                temp.push(platform.slug.replace(/\d|-.*/gi, ""))
            }
        })

        setFilteredPlatforms(temp)
    }, [])

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
                            {filteredPlatforms?.map(item => (
                                <>
                                    {item.includes("pc") && <ImWindows8 />}
                                    {item.includes('playstation')
                                        && <IoLogoPlaystation />}
                                    {item.includes("xbox") && <FaXbox />}
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