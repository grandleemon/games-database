import React, {FC, useState} from 'react';
import {Link, Outlet} from "react-router-dom";
import styles from "./Layout.module.scss";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import useScrollToTop from "../../hooks/useScrollToTop";

const Layout: FC = () => {
    useScrollToTop()

    return (
        <>
            <Header />
            <div className={styles.pageContentWrapCenterer}>
                    <div className={styles.pageContentWrap}>
                        <Sidebar />
                        <main className={styles.mainContent}>
                            <Outlet />
                        </main>
                    </div>
                </div>
        </>
    );
};

export default Layout;