import {FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {gameApi} from '../../api'
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import Loader from "../../components/Loader/Loader";
import 'react-image-lightbox/style.css';
import LightboxGallery from "../../components/Game/LightboxGallery";
import { GameDetails } from "../../components/Game";
import {IGame, IScreenshot} from "../../models/api/game";
import styles from "./index.module.scss";

const Game: FC = () => {
    const {id} = useParams()
    const [currentGame, setCurrentGame] = useState<IGame>()
    const [currentGameScreenshots, setCurrentGameScreenshots] = useState<IScreenshot[]>([])
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const getGameInfo = async () => {
        setIsLoading(true)
        if (id) {
            const {data}: any = await gameApi.getGameDetails(id)
            setCurrentGame(data)
            const {data: screenshotsData}: any = await gameApi.getGameScreenshots(id)
            setCurrentGameScreenshots(screenshotsData.results)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getGameInfo().catch(error => console.error(error))
    }, [id])

    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "fixed",
                opacity: isLoading ? "1" : "0",
                pointerEvents: isLoading ? "auto" : "none",
                backgroundColor: "black",
                width: '100vw',
                height: "100vh",
                transition: "all .3s",
                top: "0",
                left: "0"
            }}>
                <Loader/>
            </div>
            {currentGame && currentGame.name && (
                <Breadcrumbs currentPage={currentGame.name}/>
            )}
            {currentGame && <GameDetails currentGame={currentGame}
                                         gameScreenshots={currentGameScreenshots}
                                         imageIndex={currentImageIndex}
                                         openLighbox={setIsLightboxOpen}
                                         setImageIndex={setCurrentImageIndex}
            />}
            {currentGame?.background_image && (
                <div className={styles.gameBackgroundImageWrapper}>
                    <div className={styles.gameBackgroundImage}
                         style={{
                             height: "500px",
                             backgroundSize: "cover",
                             backgroundImage: `linear-gradient(rgba(15, 15, 15, 0), rgb(21, 21, 21)), linear-gradient(rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)), url(${currentGame.background_image})`,
                             opacity: `${isLoading ? "0" : "1"}`,
                             transition: "all .3s"
                         }}>
                    </div>
                </div>
            )}
            {isLightboxOpen && <LightboxGallery
                screenshots={currentGameScreenshots}
                currentIndex={currentImageIndex}
                setCurrentIndex={setCurrentImageIndex}
                closeLightbox={setIsLightboxOpen}
            />}
        </div>
    );
};

export default Game;