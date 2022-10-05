import React, {FC, useEffect, useRef, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {gameApi} from './../api/index'
import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs";
import styles from './../components/Game/Game.module.scss'
import {useQuery} from "@tanstack/react-query";
import {ImWindows8} from "react-icons/im";
import {IoLogoPlaystation} from "react-icons/io";
import {FaXbox} from "react-icons/fa";
import parse from 'html-react-parser'
import Loader from "../components/Loader/Loader";
import Lightbox from "react-image-lightbox";
import 'react-image-lightbox/style.css';
import dayjs from "dayjs";

interface IGame {
    background_image: string
    name: string
    platforms: {platform:{name: string, id: number}}[]
    parent_platforms: {platform:{slug: string}}[]
    playtime: number
    description: string
    description_raw: string
    metacritic: number
    genres: {id: number, name: string}[]
    released: string
    developers: {id: number, name: string}[]
    publishers: {id: number, name: string}[]
    esrb_rating: {name: string}
    tags: {name: string, id: number}[]
    website: string
    ratings: {percent: number, title: string, id: number}[]
}

interface IScreenshots {
    height: number
    id: number
    image: string
    is_deleted: boolean
    width: number
}

const Game: FC = () => {
    const { id } = useParams()
    const [currentGame, setCurrentGame] = useState<IGame>()
    const [currentGameScreenshots, setCurrentGameScreenshots] = useState<IScreenshots[]>([])
    const [showAbout, setShowAbout] = useState<boolean>(false)
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false)
    const statsRef = useRef<HTMLDivElement>(null)

    const {isLoading, refetch} = useQuery(['game details'],
        () => gameApi.getGameDetails(id), {
            onSuccess: (data) => {
                console.log(data)
                setCurrentGame(data?.data)
            }
        })

    useEffect(() => {
        refetch().then(({data}) => setCurrentGame(data?.data))
    }, [id])

    useEffect(() => {
        refetch().then(({data}) => setCurrentGame(data?.data))
    }, [])

    useEffect(() => {
        screenshotsRefetch().then(({data}) => setCurrentGameScreenshots(data?.data?.results))
    },[currentGame])

    const {isLoading: screenshotsLoading, refetch: screenshotsRefetch} = useQuery(['game screenshots'],
        () => gameApi.getGameScreenshots(id), {
            onSuccess: (data) => {
                setCurrentGameScreenshots(data?.data?.results)
            }
        })

    const {isLoading: moviesLoading} = useQuery(['game movies'],
        () => gameApi.getGameMovies(id), {
            onSuccess: (data) => {
                console.log(data)
            }
        })

   const openLightbox = (idx: number) => {
        setTimeout(() => {
            setIsLightboxOpen(true)
            setCurrentImageIndex(idx)
        }, 1)
   }

   const moveToNextSlide = () => {
        if(currentImageIndex + 1 === currentGameScreenshots.length ){
            setCurrentImageIndex(0)
        } else {
            setCurrentImageIndex(prev => prev + 1)
        }
   }

    const moveToPrevSlide = () => {
        if(currentImageIndex === 0){
            setCurrentImageIndex(currentGameScreenshots.length - 1)
        } else {
            setCurrentImageIndex(prev => prev - 1)
        }
    }

    const checkMetaScore = (score: number | undefined) => {
        if(score){
            if(score >= 80) {
                return {color: "#6dc849", borderColor: "rgba(109,200,73,.4)"}
            }
            if(score < 80 && score >= 40) return {color: "#E67F35", borderColor: "rgba(230,127,53,0.4)"}
            return {color: "#C81316", borderColor: "rgba(200,19,22,0.4)"}
        }
    }

    return (
        <>
            {<div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", opacity: isLoading && moviesLoading && screenshotsLoading ? "1" : "0", pointerEvents: isLoading && moviesLoading && screenshotsLoading ? "auto" : "none", backgroundColor: "black", width: '100vw', height: "100vh", transition: "all .3s", top: "0", left: "0"}}>
                    <Loader/>
                </div>
            }
            <Breadcrumbs currentPage={currentGame?.name}></Breadcrumbs>
            <div className={styles.gameDetails}>
                <div className={styles.gameInfo}>
                    <div className={styles.gameHead}>
                        <div className={styles.headPlatforms}>
                            {currentGame?.parent_platforms.map(item => (
                                <>
                                    {item.platform.slug.includes("pc") && <ImWindows8 />}
                                    {item.platform.slug.includes('playstation')
                                        && <IoLogoPlaystation />}
                                    {item.platform.slug.includes("xbox") && <FaXbox />}
                                </>
                            ))}
                        </div>
                        <div>
                            AVERAGE PLAYTIME: {currentGame?.playtime} HOURS
                        </div>
                    </div>
                    <h1>{currentGame?.name}</h1>
                    <div className={styles.ratingDistribution}>
                        <div className={styles.ratingDistributionStats} ref={statsRef}>
                            {currentGame?.ratings?.map((item) => (
                                <div key={item.id} className={item.title} style={{width: statsRef?.current ? Math.round(item.percent) * statsRef?.current?.clientWidth / 100 + 'px' : ""}}></div>
                            ))}
                        </div>
                        <div className={styles.distributionMeta}>
                            distribution meta
                        </div>
                    </div>
                    <div className={styles.gameDescription}>
                        <h2>About</h2>
                        {(currentGame?.description && currentGame?.description.length >= 612 && !showAbout)
                            ? <>
                                {currentGame?.description_raw.substring(0, 612) + "..." + " "}
                                <span onClick={() => setShowAbout(true)}>Read more</span>
                            </>
                            : currentGame?.description && <>
                            {parse(currentGame?.description)}
                            <span onClick={() => setShowAbout(false)}>Show less</span>
                        </>}




                    </div>
                    <div className={styles.gameMeta}>
                        <div className={styles.gameMetaBlock}>
                            <div className={styles.metaTitle}>Platforms</div>
                            <div className={styles.metaText}>
                                {currentGame?.platforms.map((item, idx) => (
                                    <>
                                        <Link to={`/platforms/${item.platform.id}`}>{item.platform.name}</Link>
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
                                        <Link to={`/genres/${item.id}`}>{item.name}</Link>
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
                                    <Link to={`/developers/${item.id}`}>{item.name}</Link>
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
                                        <Link to={`/publishers/${item.id}`}>{item.name}</Link>
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
                                        <Link to={`/tags/${item.id}`}>{item.name}</Link>
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
                        {currentGameScreenshots?.length > 4
                            ? <>
                                {currentGameScreenshots?.slice(0, 3).map((item, idx) => (
                                    <div className={styles.screenshotWrapper} key={item.id} onClick={() => openLightbox(idx)}>
                                        <img src={item.image} alt="game screenshot"/>
                                    </div>))}
                                <div className={styles.viewAllScreenshots} onClick={() => openLightbox(currentImageIndex)}>view all</div>
                            </>
                            : currentGameScreenshots?.map((item, idx) => (
                            <div className={styles.screenshotWrapper} key={item.id} onClick={() => openLightbox(idx)}>
                                <img src={item.image} alt="game screenshot"/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <div className={styles.gameBackgroundImageWrapper}>
                <div className={styles.gameBackgroundImage} style={{height: "500px", backgroundSize: "cover", backgroundImage: `linear-gradient(rgba(15, 15, 15, 0), rgb(21, 21, 21)), linear-gradient(rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)), url(${currentGame?.background_image})`, opacity: `${isLoading ? "0" : "1"}`, transition: "all .3s"}}>
                </div>
            </div>
            {isLightboxOpen && (
                <Lightbox
                    mainSrc={currentGameScreenshots[currentImageIndex]?.image}
                    onCloseRequest={() => setIsLightboxOpen(false)}
                    nextSrc={currentGameScreenshots[(currentImageIndex + 1) % currentGameScreenshots.length].image}
                    prevSrc={currentGameScreenshots[(currentImageIndex + currentGameScreenshots.length - 1) % currentGameScreenshots.length].image}
                    onMoveNextRequest={moveToNextSlide}
                    onMovePrevRequest={moveToPrevSlide}
                    toolbarButtons={[<button>next</button>]}
                />)}
        </>
    );
};

export default Game;