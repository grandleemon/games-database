import React, {FC, useState} from 'react';
import styles from './GameCard.module.scss'
import strayImg from './../../assets/images/stray-img.png'
import {Link} from "react-router-dom";
import { ImWindows8 } from 'react-icons/im'
import { IoLogoPlaystation } from 'react-icons/io'
import { AiOutlinePlus } from 'react-icons/ai'
import { HiOutlineGift } from 'react-icons/hi'

const GameCard: FC = () => {
    const [hover, setHover] = useState<boolean>(false)

    return (
        <div className={`${styles.cardWrapper} ${hover ? styles.opened : ""}`}
             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}
        >
            <div className={styles.wrapper}>
                <div className={styles.cardMediaWrapper}>
                    <img src={strayImg} alt="game image/video"/>
                </div>

                <div className={styles.cardContent}>
                    <div className={styles.platformsAndScore}>
                        <div className={styles.gamePlatforms}>
                            <ImWindows8 />
                            <IoLogoPlaystation />
                        </div>
                        <div className={styles.gameScore}>
                            84
                        </div>
                    </div>

                    <div className={styles.gameTitle}>
                        <Link to='/games/stray'>Stray</Link>
                    </div>

                    <div className={styles.cardButtons}>
                        <button className={styles.buttonAdd}>
                            <AiOutlinePlus />
                            2,123
                        </button>
                        <button className={styles.buttonWishlist}>
                            <HiOutlineGift />
                        </button>
                    </div>

                    {hover && <div className={`${styles.additionalInfo}`}>
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
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default GameCard;