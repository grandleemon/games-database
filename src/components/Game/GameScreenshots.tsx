import { FC } from 'react';
import styles from "./Game.module.scss";

interface IScreenshotItem {
    image: string
    id: number
}

interface IProps {
    screenshots: IScreenshotItem[]
    openLightbox: (i: number) => void
    currentImageIndex: number
}

const GameScreenshots: FC<IProps> = ({screenshots, openLightbox, currentImageIndex}) => (
    <>
        {screenshots?.slice(0, 3).map((item, i) => (
            <div className={styles.screenshotWrapper} key={item.id} onClick={() => openLightbox(i)}>
                <img src={item.image} alt="game screenshot"/>
            </div>
        ))}
        {screenshots.length > 4 && (
            <div className={styles.viewAllScreenshots}
                 onClick={() => openLightbox(currentImageIndex)}>
                view all
            </div>
        )}
    </>
)

export default GameScreenshots;