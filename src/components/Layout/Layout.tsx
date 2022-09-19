import React, {useEffect, useRef} from 'react';
import styles from "./Layout.module.scss";
import {Link} from "react-router-dom";

const Layout = () => {
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {

        document.addEventListener('keydown', (e) => {
            if(e.altKey && e.key === 'Enter'){
                inputRef?.current?.focus()
                console.log(inputRef.current)
            }
        })

        return () => {
            document.removeEventListener('keydown', () => {})
        }
    }, [])

    return (
        <>
            <header className={styles.header}>
                <div className={styles.headerWrapper}>
                    <div className={styles.headerItem}>
                        <Link to='/' className={styles.logoLink}>LOGO</Link>
                    </div>

                    <div className={`${styles.headerItem} ${styles.headerSearch}`}>
                        <div className={styles.inputWrapper}>
                            <input type="text" className={styles.searchInput} placeholder="Search games" ref={inputRef}/>
                            <div className={styles.searchKeyFocus}>
                                <div>alt</div>
                                <span>+</span>
                                <div>enter</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.headerItem}>
                        <Link to='/profile' className={styles.profileLink}>My Profile</Link>
                    </div>

                    <div className={styles.headerItem}>
                        <Link to='/library' className={styles.profileLink}>My Library</Link>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Layout;