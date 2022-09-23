import React, {FC, useState} from 'react';
import {IMenu} from "./Sidebar";
import {Link} from "react-router-dom";
import styles from './Sidebar.module.scss'

const SidebarMenuItem: FC<IMenu> = (item: IMenu) => {
    const [show, setShow] = useState(false)

    return (
        <div className={styles.sidebarMenuItem}>
            {item.link
                ? <Link to={item.link} className={styles.menuLink}>{item.title}</Link>
                : <span className={styles.menuTitle}>{item.title}</span>}
            {item?.list && item?.list?.length > 4
                ? <ul className={styles.menuList}>
                    {item?.list?.slice(0, !show ? 3 : item.list.length).map(listItem => (
                            <li className={styles.menuListItem}>
                                <Link to={listItem?.link}>{listItem.title}</Link>
                            </li>
                        ))
                    }
                    <li onClick={() => setShow(!show)} className={styles.menuListShowAll}>{show ? "Hide" : "Show all"}</li>
                </ul>
                : item.list && item.list.length <= 4 ? <ul className={styles.menuList}>
                    {item?.list?.map(listItem => (
                        <li className={styles.menuListItem}>
                            <Link to={listItem?.link}>{listItem.title}</Link>
                        </li>
                    ))
                    }
                </ul> : null
            }
        </div>
    );
};

export default SidebarMenuItem;