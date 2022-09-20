import React, {FC, useEffect, useRef, useState} from 'react';
import styles from "./Layout.module.scss";
import {Link, Outlet} from "react-router-dom";

import { FiUser } from 'react-icons/fi'

const browseList: string[] = ["Platforms", "Stores", "Collections", "Reviews", "Genres", "Creators", "Tags", "Developers", "Publishers"]
const platformsList: string[] = ["PC", "PlayStation 4", "Xbox One", "Nintendo Switch", "iOS", "Android"]
const genresList: string[] = ["Action", "Strategy", "RPG", "Shooter", "Adventure", "Puzzle", "Racing", "Sports"]

const Layout: FC = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [browseShowAll, setBrowseShowAll] = useState<boolean>(false)
    const [platformsShowAll, setPlatformsShowAll] = useState<boolean>(false)
    const [genresShowAll, setGenresShowAll] = useState<boolean>(false)

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
                        <Link to='/profile' className={styles.profileLink}>
                            <FiUser />
                        </Link>
                    </div>

                    <div className={styles.headerItem}>
                        <Link to='/library' className={styles.profileLink}>My Library</Link>
                    </div>
                </div>
            </header>
            <div className={styles.pageContentWrapCenterer}>
                    <div className={styles.pageContentWrap}>
                        <div className={styles.sidebarWrapper}>
                            <aside>
                                <nav>
                                    <div className={`${styles.sidebarMenuItem} ${styles.nonListLinks}`}>
                                        <Link to="/">Home</Link>
                                    </div>
                                    <div className={`${styles.sidebarMenuItem} ${styles.nonListLinks}`}>
                                        <Link to="/reviews">Reviews</Link>
                                    </div>
                                    <div className={styles.sidebarListWrapper}>
                                        <Link to='/profile' className={styles.listLink}>My Profile</Link>
                                        <ul className={styles.sidebarElementsList}>
                                            <li>
                                                <Link to='/wishlist'>Wishlist</Link>
                                            </li>
                                            <li>
                                                <Link to='/my-library'>My library</Link>
                                            </li>
                                            <li>
                                                <Link to='/friends'>People you follow</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className={styles.sidebarListWrapper}>
                                        <span>New Releases</span>
                                        <ul className={styles.sidebarElementsList}>
                                            <li>
                                                <Link to='/last-30-days'>Last 30 days</Link>
                                            </li>
                                            <li>
                                                <Link to='/this-week'>This week</Link>
                                            </li>
                                            <li>
                                                <Link to='/next-week'>Next week</Link>
                                            </li>
                                            <li>
                                                <Link to='/video-game-releases'>Release calendar</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className={styles.sidebarListWrapper}>
                                        <span>Top</span>
                                        <ul className={styles.sidebarElementsList}>
                                            <li>
                                                <Link to='/best-of-year'>Best of year</Link>
                                            </li>
                                            <li>
                                                <Link to='/popular-in-2021'>Popular in 2021</Link>
                                            </li>
                                            <li>
                                                <Link to='/all-time-top'>All time top 250</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className={`${styles.sidebarMenuItem} ${styles.nonListLinks}`}>
                                        <Link to="/games">All Games</Link>
                                    </div>
                                    <div className={styles.sidebarListWrapper}>
                                        <Link to='/games/browse' className={styles.listLink}>Browse</Link>
                                        <ul className={styles.sidebarElementsList}>
                                            {!browseShowAll ? browseList.slice(0, 3).map((name, index) => (
                                                <li key={index}>
                                                    <Link to={`/games/${name.toLowerCase().replace(/\s/g, "-")}`}>{name}</Link>
                                                </li>
                                            )) : browseList.map((name, index) => (
                                                <li key={index}>
                                                    <Link to={`/games/${name.toLowerCase().replace(/\s/g, "-")}`}>{name}</Link>
                                                </li>
                                            ))}
                                            <li onClick={() => setBrowseShowAll(!browseShowAll)}>
                                                <span>Show all</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className={styles.sidebarListWrapper}>
                                        <Link to='/games/platforms' className={styles.listLink}>Platforms</Link>
                                        <ul className={styles.sidebarElementsList}>
                                            {!platformsShowAll ? platformsList.slice(0, 3).map((name, index) => (
                                                <li key={index}>
                                                    <Link to={`/games/${name.toLowerCase().replace(/\s/g, "-")}`}>{name}</Link>
                                                </li>
                                            )) : platformsList.map((name, index) => (
                                                <li key={index}>
                                                    <Link to={`/games/${name.toLowerCase().replace(/\s/g, "-")}`}>{name}</Link>
                                                </li>
                                            ))}
                                            <li onClick={() => setPlatformsShowAll(!platformsShowAll)}>
                                                <span>Show all</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className={styles.sidebarListWrapper}>
                                        <Link to='/genres' className={styles.listLink}>Genres</Link>
                                        <ul className={styles.sidebarElementsList}>
                                            {!genresShowAll ? genresList.slice(0, 3).map((name, index) => (
                                                <li key={index}>
                                                    <Link to={`/games/${name.toLowerCase().replace(/\s/g, "-")}`}>{name}</Link>
                                                </li>
                                            )) : genresList.map((name, index) => (
                                                <li key={index}>
                                                    <Link to={`/games/${name.toLowerCase().replace(/\s/g, "-")}`}>{name}</Link>
                                                </li>
                                            ))}
                                            <li onClick={() => setGenresShowAll(!genresShowAll)}>
                                                <span>Show all</span>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </aside>
                        </div>
                        <main className={styles.mainContent}>
                            <Outlet />
                        </main>
                    </div>
                </div>
        </>
    );
};

export default Layout;