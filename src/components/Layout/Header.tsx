import {FC, MutableRefObject, useEffect, useRef, useState} from 'react';
import styles from "./Layout.module.scss";
import {Link, useLocation} from "react-router-dom";
import {FiUser} from "react-icons/fi";
import {useAppSelector} from "../../store";
import {gamesSelector} from "../../store/features/games";
import {useDebounce} from "../../hooks/useDebounce";
import axios from "axios";
import Loader from "../Loader/Loader";
import {useClickOutside} from "../../hooks/useClickOutside";

interface IResults {
    count: number
    results: []
}

interface IResultsItem {
    name: string
    id: number
    background_image: string
}

const Header: FC = () => {
    const location = useLocation()
    const inputRef = useRef<HTMLInputElement>(null)
    const {gamesCounter} = useAppSelector(gamesSelector)
    const [gamesCount, setGamesCount] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const [searchResults, setSearchResults] = useState<IResults>()
    const [loading, setLoading] = useState(false)
    const [showSearchDropdown, setShowSearchDropdown] = useState(false)

    const ref: MutableRefObject<HTMLDivElement> = useClickOutside(() => {
        setShowSearchDropdown(false)
    })

    useEffect(() => {
        setShowSearchDropdown(false)
        setSearchTerm('')
    }, [location])

    useEffect(() => {
        if (debouncedSearchTerm) {
            setLoading(true)
            axios
                .get(`${import.meta.env.VITE_API_URL}games?key=${import.meta.env.VITE_API_KEY}&search=${debouncedSearchTerm}`)
                .then(({data}) => {
                    setSearchResults(data)
                    setLoading(false)
                })
        }
    }, [debouncedSearchTerm])

    useEffect(() => {
        if (gamesCounter) {
            setGamesCount(gamesCounter.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,'))
        }
    }, [gamesCounter])

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.altKey && e.key === 'Enter') {
                inputRef?.current?.focus()
            }
        }

        document.addEventListener('keydown', onKeyDown)

        return () => {
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [])

    return (
        <header className={styles.header}>
            <div className={styles.headerWrapper}>
                <div className={styles.headerItem}>
                    <Link to='/' className={styles.logoLink}>LOGO</Link>
                </div>
                <div className={`${styles.headerItem} ${styles.headerSearch}`}>
                    <div className={styles.inputWrapper} ref={ref}>
                        <input type="text" className={styles.searchInput}
                               value={searchTerm}
                               onFocus={() => setShowSearchDropdown(true)}
                            // onBlur={() => setShowSearchDropdown(false)}
                               placeholder={`Search games`}
                               ref={inputRef}
                               onChange={e => setSearchTerm(e.target.value)}/>
                        <div className={styles.searchKeyFocus}>
                            <div>alt</div>
                            <span>+</span>
                            <div>enter</div>
                        </div>
                        <div
                            className={`${styles.searchResultsWrapper} ${(showSearchDropdown && searchTerm.length !== 0 && debouncedSearchTerm.length !== 0) ? styles.active : ""}`}>
                            <div className={styles.resultsSection}>
                                <div className={styles.sectionTitle}>
                                    Games
                                    <span>{searchResults?.count ? searchResults?.count : ""}</span>
                                </div>
                                <div className={styles.sectionContent}>
                                    {!loading ? searchResults?.results?.slice(0, 10).map((item: IResultsItem) => (
                                            <Link to={`/games/${item.id}`}>
                                                <div className={styles.resultImage}>
                                                    <img src={item.background_image} alt="search game image"/>
                                                </div>
                                                {item.name}
                                            </Link>
                                        )) : <div className="w-full flex justify-center">
                                            <Loader/>
                                        </div>}
                                    {!loading ? <Link to='/search&query='>See all results</Link> : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.headerItem}>
                    <Link to='/profile' className={styles.profileLink}>
                        <FiUser/>
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