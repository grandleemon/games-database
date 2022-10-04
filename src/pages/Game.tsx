import React, {FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
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

interface IGame {
    background_image: string
    name: string
    parent_platforms: {platform:{slug: string}}[]
    playtime: number
    description: string
    description_raw: string
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
    const [filteredPlatforms, setFilteredPlatforms] = useState<string[]>([])
    const [showAbout, setShowAbout] = useState<boolean>(false)

    const {isLoading} = useQuery(['game details'],
        () => gameApi.getGameDetails(id), {
            onSuccess: (data) => {
                console.log(data)
                setCurrentGame(data?.data)
            }
        })

    const {isLoading: screenshotsLoading} = useQuery(['game screenshots'],
        () => gameApi.getGameScreenshots(id), {
            onSuccess: (data) => {
                setCurrentGameScreenshots(data?.data?.results)
            }
        })

    const {isLoading: moviesLoading} = useQuery(['game movies'],
        () => gameApi.getGameMovies(id), {
            onSuccess: (data) => {

            }
        })

    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false)

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

    return (
        <>
            {<div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", opacity: isLoading && moviesLoading && screenshotsLoading ? "1" : "0", pointerEvents: isLoading && moviesLoading && screenshotsLoading ? "auto" : "none", backgroundColor: "black", width: '100vw', height: "100vh", transition: "all .3s", top: "0", left: "0"}}>
                    <Loader/>
                </div>
            }
            <Breadcrumbs currentPage={currentGame?.name}></Breadcrumbs>
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
                </div>

                <div className={styles.gameMediaInfo}>
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
        </>
    );
};

export default Game;