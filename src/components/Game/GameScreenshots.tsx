import React, {Dispatch, FC, SetStateAction} from 'react';
import styles from "./Game.module.scss";

interface IProps {
    screenshots: {image: string, id: number}[]
    openLightbox: (idx: number) => void
    currentImageIndex: number
}

const GameScreenshots: FC<IProps> = ({screenshots, openLightbox, currentImageIndex}) => {
    return (
        <>
            {screenshots?.length > 4
                ? <>
                    {screenshots?.slice(0, 3).map((item, idx) => (
                        <div className={styles.screenshotWrapper} key={item.id} onClick={() => openLightbox(idx)}>
                            <img src={item.image} alt="game screenshot"/>
                        </div>))}
                    <div className={styles.viewAllScreenshots} onClick={() => openLightbox(currentImageIndex)}>view all</div>
                </>
                : screenshots?.map((item, idx) => (
                    <div className={styles.screenshotWrapper} key={item.id} onClick={() => openLightbox(idx)}>
                        <img src={item.image} alt="game screenshot"/>
                    </div>
                ))}
        </>
    );
};

export default GameScreenshots;