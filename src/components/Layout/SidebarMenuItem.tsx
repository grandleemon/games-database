import {FC, useState} from 'react';
import {Link} from "react-router-dom";
import styles from './Layout.module.scss'
import {IMenu} from "../../models/layout";

const SidebarMenuItem: FC<IMenu> = (item) => {
    const [show, setShow] = useState<boolean>(false)

    const sliceLength = !show ? 3 : item.list && item.list.length

    return (
        <li className={styles.sidebarMenuItem}>
            {item.link
                ? <Link to={item.link} className={styles.menuLink}>{item.title}</Link>
                : <span className={styles.menuTitle}>{item.title}</span>
            }
            {item?.list && item?.list?.length > 4 ? (
                <ul className={styles.menuList}>
                    {item.list.slice(0, sliceLength).map((listItem, idx) => (
                        <li className={styles.menuListItem} key={idx}>
                            <Link to={listItem?.link}>{listItem.title}</Link>
                        </li>
                    ))}
                    <li onClick={() => setShow(!show)}
                        className={styles.menuListShowAll}>{show ? "Hide" : "Show all"}</li>
                </ul>
            ) : item.list && item.list.length <= 4 && (
                <ul className={styles.menuList}>
                    {item.list.map((listItem, idx) => (
                        <li className={styles.menuListItem} key={idx}>
                            <Link to={listItem?.link}>{listItem.title}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
};

export default SidebarMenuItem;