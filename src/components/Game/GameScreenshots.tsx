import React, {Dispatch, FC, SetStateAction} from 'react';
import styles from "./Game.module.scss";

interface IScreenshotItem {
    image: string
    id: number
}

interface IProps {
    screenshots: IScreenshotItem[]
    openLightbox: (idx: number) => void
    currentImageIndex: number
}

const GameScreenshots: FC<IProps> = ({screenshots, openLightbox, currentImageIndex}) => {

    const gameScreenshots = screenshots?.slice(0, 3).map((item, idx) => (
        <div className={styles.screenshotWrapper} key={item.id} onClick={() => openLightbox(idx)}>
            <img src={item.image} alt="game screenshot"/>
        </div>
    ))

    return (
        <>
            {gameScreenshots}
            {screenshots.length > 4 && <div className={styles.viewAllScreenshots}
                        onClick={() => openLightbox(currentImageIndex)}>
                    view all
            </div>}

        </>
    );
};

export default GameScreenshots;