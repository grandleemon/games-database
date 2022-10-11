import React, {FC, useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {gameApi} from './../api/index'
import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs";
import Loader from "../components/Loader/Loader";
import 'react-image-lightbox/style.css';
import LightboxGallery from "../components/LightboxGallery/LightboxGallery";
import BackgroundImageWrapper from "../components/Game/BackgroundImageWrapper";
import GameDetails from "../components/Game/GameDetails";

export interface IGame {
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
    ratings: {percent: number, title: string, id: number, count: number}[]
}

export interface IScreenshots {
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
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const getGameInfo = async () => {
        setIsLoading(true)
        if(id){
            const { data }: any = await gameApi.getGameDetails(id)
            setCurrentGame(data)
            const { data: screenshotsData }: any = await gameApi.getGameScreenshots(id)
            setCurrentGameScreenshots(screenshotsData.results)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getGameInfo().catch(error => console.error(error))
    }, [id])

    return (
        <>
            {<div style={{display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", opacity: isLoading ? "1" : "0", pointerEvents: isLoading ? "auto" : "none", backgroundColor: "black", width: '100vw', height: "100vh", transition: "all .3s", top: "0", left: "0"}}>
                    <Loader/>
                </div>
            }

            {currentGame && currentGame.name && (
                <Breadcrumbs currentPage={currentGame.name} />
            )}

            {currentGame && <GameDetails currentGame={currentGame}
                         gameScreenshots={currentGameScreenshots}
                         imageIndex={currentImageIndex}
                         openLighbox={setIsLightboxOpen}
                         setImageIndex={setCurrentImageIndex}
            />}

            {currentGame?.background_image && <BackgroundImageWrapper background={currentGame.background_image}
                                                                      isLoading={isLoading}
            />}

            {isLightboxOpen && <LightboxGallery
                screenshots={currentGameScreenshots}
                currentIndex={currentImageIndex}
                setCurrentIndex={setCurrentImageIndex}
                closeLightbox={setIsLightboxOpen}
            />}
        </>
    );
};

export default Game;