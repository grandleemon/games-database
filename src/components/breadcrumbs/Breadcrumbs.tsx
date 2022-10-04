import styles from './Breadcrumbs.module.scss'
import {Link} from "react-router-dom";
import {FC} from "react";

const Breadcrumbs: FC<{currentPage: string | undefined}> = ({currentPage}) => {
    return (
        <div className={styles.breadcrumbs}>
            <Link to='/'>Home</Link>
            <span>/</span>
            <Link to='/games'>Games</Link>
            <span>/</span>
            <span>{currentPage}</span>
        </div>
    );
};

export default Breadcrumbs;