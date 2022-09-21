import React, {FC, useEffect, useRef} from 'react';
import styles from "./Header.module.scss";
import {Link} from "react-router-dom";
import {FiUser} from "react-icons/fi";
import {useAppSelector} from "../../../store";
import {gamesSelector} from "../../../store/features/games";

const Header: FC = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const games = useAppSelector(gamesSelector)

    useEffect(() => {

        document.addEventListener('keydown', (e) => {
            if(e.altKey && e.key === 'Enter'){
                inputRef?.current?.focus()
            }
        })

        return () => {
            document.removeEventListener('keydown', () => {})
        }
    }, [])

    return (
        <header className={styles.header}>
            <div className={styles.headerWrapper}>
                <div className={styles.headerItem}>
                    <Link to='/' className={styles.logoLink}>LOGO</Link>
                </div>

                <div className={`${styles.headerItem} ${styles.headerSearch}`}>
                    <div className={styles.inputWrapper}>
                        <input type="text" className={styles.searchInput}
                               placeholder={`Search ${games?.games?.count} games`}
                               ref={inputRef}/>
                        <div className={styles.searchKeyFocus}>
                            <div>alt</div>
                            <span>+</span>
                            <div>enter</div>
                        </div>
                    </div>
                </div>

                <div className={styles.headerItem}>
                    <Link to='/profile' className={styles.profileLink}>
                        <FiUser />
                    </Link>
                </div>

                <div className={styles.headerItem}>
                    <Link to='/library' className={styles.profileLink}>My Library</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;