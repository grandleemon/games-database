import {FC} from 'react';
import styles from './Header.module.scss'
import {Link} from "react-router-dom";

const Header: FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerWrapper}>
                <div className={styles.headerItem}>
                    <Link to='/'>Logo</Link>
                </div>
            </div>
        </header>
    );
};

export default Header
