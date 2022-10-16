import { FC } from 'react';
import styles from './index.module.scss'
import Cards from "../../components/Home/Cards";

const Homepage: FC = () => {

    return (
        <div className={styles.homepage}>
            <div className={styles.heading}>
                <h1>New and trending</h1>
                <p>Based on player counts and release date</p>
            </div>
            <Cards />
        </div>
    );
};

export default Homepage;