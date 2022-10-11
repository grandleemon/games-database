import React from 'react';
import styles from "./Game.module.scss";

interface IProps {
    isLoading: boolean
    background: string
}

const BackgroundImageWrapper = ({background, isLoading}: IProps) => {
    return (
        <div className={styles.gameBackgroundImageWrapper}>
            <div className={styles.gameBackgroundImage}
                 style={{height: "500px", backgroundSize: "cover", backgroundImage: `linear-gradient(rgba(15, 15, 15, 0), rgb(21, 21, 21)), linear-gradient(rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)), url(${background})`, opacity: `${isLoading ? "0" : "1"}`, transition: "all .3s"}}>
            </div>
        </div>
    );
};

export default BackgroundImageWrapper;