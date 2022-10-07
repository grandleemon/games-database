import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import styles from "./Game.module.scss";
import GamePlatforms from "./GamePlatforms";
import DistributionStats from "./DistributionStats";
import DistributionMeta from "./DistributionMeta";
import GameAbout from "./GameAbout";
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import GameScreenshots from "./GameScreenshots";
import {IGame, IScreenshots} from "../../pages/Game";

interface IProps {
    currentGame: undefined | IGame
    openLighbox: Dispatch<SetStateAction<boolean>>
    setImageIndex: Dispatch<SetStateAction<number>>
    imageIndex: number
    gameScreenshots: IScreenshots[]
}

const GameDetails: FC<IProps> = ({currentGame, openLighbox, setImageIndex, imageIndex, gameScreenshots}) => {
    const [hoveredMeta, setHoveredMeta] = useState<string>("")

    const checkMetaScore = (score: number) => {
        if(score){
            if(score >= 80) {
                return {color: "#6dc849", borderColor: "rgba(109,200,73,.4)"}
            }
            if(score < 80 && score >= 40) return {color: "#E67F35", borderColor: "rgba(230,127,53,0.4)"}
            return {color: "#C81316", borderColor: "rgba(200,19,22,0.4)"}
        }
    }

    const openLightbox = (idx: number) => {
        setTimeout(() => {
            openLighbox(true)
            setImageIndex(idx)
        }, 1)
    }

    return (
        <div className={styles.gameDetails}>
            <div className={styles.gameInfo}>
                <div className={styles.gameHead}>
                    <div className={styles.headPlatforms}>
                        <GamePlatforms game={currentGame} />
                    </div>
                    <div>
                        AVERAGE PLAYTIME: {currentGame?.playtime} HOURS
                    </div>
                </div>
                <h1>{currentGame?.name}</h1>
                <div className={styles.totalGameRating}>
                    <div className={styles.totalGameRatingText}>{currentGame?.ratings[0]?.title}</div>
                    <div className={styles.ratingChart}>{currentGame?.ratings?.reduce((acc, next) => acc + next.count, 0)} ratings</div>
                </div>
                <div className={styles.ratingDistribution}>
                    <DistributionStats game={currentGame}
                                       hoveredMeta={hoveredMeta}
                                       setHoveredMeta={setHoveredMeta}
                    />
                    <div className={styles.distributionMeta}>
                        <DistributionMeta game={currentGame}
                                          hoveredMeta={hoveredMeta}
                                          setHoveredMeta={setHoveredMeta}
                        />
                    </div>
                </div>
                <div className={styles.gameDescription}>
                    <h2>About</h2>
                    <GameAbout game={currentGame}/>
                </div>
                <div className={styles.gameMeta}>
                    <div className={styles.gameMetaBlock}>
                        <div className={styles.metaTitle}>Platforms</div>
                        <div className={styles.metaText}>
                            {currentGame?.platforms.map((item, idx) => (
                                <>
                                    <Link key={idx} to={`/platforms/${item.platform.id}`}>{item.platform.name}</Link>
                                    {idx !== currentGame?.platforms?.length - 1 ? ", " : ""}
                                </>
                            ))}
                        </div>
                    </div>
                    {currentGame?.metacritic && <div className={styles.gameMetaBlock}>
                        <div className={styles.metaTitle}>Metacritic</div>
                        <div className={styles.metaText}>
                            <div className={`${styles.metaScore}`} style={checkMetaScore(currentGame?.metacritic)}>{currentGame?.metacritic}</div>
                        </div>
                    </div>}
                    <div className={styles.gameMetaBlock}>
                        <div className={styles.metaTitle}>Genre</div>
                        <div className={styles.metaText}>
                            {currentGame?.genres.map((item, idx) => (
                                <>
                                    <Link key={idx} to={`/genres/${item.id}`}>{item.name}</Link>
                                    {idx !== currentGame?.genres?.length - 1 ? ", " : ""}
                                </>
                            ))}
                        </div>
                    </div>
                    <div className={styles.gameMetaBlock}>
                        <div className={styles.metaTitle}>Release date</div>
                        <div className={styles.metaText}>
                            {currentGame?.released ? dayjs(currentGame?.released).format("MMM DD, YYYY") : "TBA"}
                        </div>
                    </div>

                    <div className={styles.gameMetaBlock}>
                        <div className={styles.metaTitle}>Developer</div>
                        <div className={styles.metaText}>
                            {currentGame?.developers?.map((item, idx) => (
                                <>
                                    <Link key={idx} to={`/developers/${item.id}`}>{item.name}</Link>
                                    {idx !== currentGame?.developers?.length - 1 ? ", " : ""}
                                </>
                            ))}
                        </div>
                    </div>

                    <div className={styles.gameMetaBlock}>
                        <div className={styles.metaTitle}>Publisher</div>
                        <div className={styles.metaText}>
                            {currentGame?.publishers?.map((item, idx) => (
                                <>
                                    <Link key={idx} to={`/publishers/${item.id}`}>{item.name}</Link>
                                    {idx !== currentGame?.publishers?.length - 1 ? ", " : ""}
                                </>
                            ))}
                        </div>
                    </div>

                    <div className={styles.gameMetaBlock}>
                        <div className={styles.metaTitle}>Age rating</div>
                        <div className={styles.metaText}>
                            {currentGame?.esrb_rating?.name === 'Mature' && "17+ "}
                            {currentGame?.esrb_rating?.name ? currentGame?.esrb_rating?.name : "Not rated"}
                        </div>
                    </div>

                    <div className={`${styles.gameMetaBlock} ${styles.wideBlock}`}>
                        <div className={styles.metaTitle}>Age rating</div>
                        <div className={styles.metaText}>
                            {currentGame?.tags?.map((item, idx) => (
                                <>
                                    <Link key={idx} to={`/tags/${item.id}`}>{item.name}</Link>
                                    {idx !== currentGame?.tags?.length - 1 ? ", " : ""}
                                </>
                            ))}
                        </div>
                    </div>

                    <div className={`${styles.gameMetaBlock} ${styles.wideBlock}`}>
                        <div className={styles.metaTitle}>Website</div>
                        <div className={styles.metaText}>
                            <a href={currentGame?.website} target="_blank">{currentGame?.website}</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.gameMediaInfo}>
                <div className={styles.gameVideo}>
                    <iframe width="100%" height="216" src="https://www.youtube.com/embed/VbIc2_FwReE?autoplay=1&mute=1&controls=0"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                    </iframe>
                </div>
                <div className={styles.gameScreenshots}>
                    <GameScreenshots screenshots={gameScreenshots}
                                     openLightbox={openLightbox}
                                     currentImageIndex={imageIndex}
                    />
                </div>
            </div>
        </div>
    );
};

export default GameDetails;