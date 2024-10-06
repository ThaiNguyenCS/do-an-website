import React, { createContext, useContext, useEffect, useState } from "react";
import styles from "./MainPageNav.module.css";
import ChildNavItem from "./ChildNavItem";
import ProductPreviewItem from "./ProductPreviewItem";
import { giaynamnavs, giaynunavs, giayTreEmNavs } from "../utils/urlMapping";
import { useLocation } from "react-router-dom";

const MainPageNavContext = createContext({});

const MainPageNav = () => {
    const [activeNav, setActiveNav] = useState(0);
    const [activeChildNav, setActiveChildNav] = useState("");
    const location = useLocation();
    useEffect(() => {
        setActiveChildNav(location.pathname);
    }, []);

    return (
        <>
            <div className={styles["container"]}>
                <ul className={styles["nav-parent"]}>
                    <li
                        className={`${styles["nav-parent-item"]} ${activeNav === 0 ? styles["active"] : ""} `}
                        onClick={() => {
                            setActiveNav(0);
                        }}
                    >
                        GIÀY NAM
                    </li>
                    <li
                        className={`${styles["nav-parent-item"]} ${activeNav === 1 ? styles["active"] : ""}`}
                        onClick={() => {
                            setActiveNav(1);
                        }}
                    >
                        GIÀY NỮ
                    </li>
                    <li
                        className={`${styles["nav-parent-item"]} ${activeNav === 2 ? styles["active"] : ""}`}
                        onClick={() => {
                            setActiveNav(2);
                        }}
                    >
                        GIÀY TRẺ EM
                    </li>
                </ul>

                <MainPageNavContext.Provider value={{ activeChildNav, setActiveChildNav }}>
                    <ul className={styles["nav-children"]}>
                        {activeNav === 0 &&
                            giaynamnavs?.length > 0 &&
                            giaynamnavs.map((item) => <ChildNavItem item={item} />)}
                        {activeNav === 1 &&
                            giaynunavs?.length > 0 &&
                            giaynunavs.map((item) => <ChildNavItem item={item} />)}
                        {activeNav === 2 &&
                            giayTreEmNavs?.length > 0 &&
                            giayTreEmNavs.map((item) => <ChildNavItem item={item} />)}
                    </ul>
                </MainPageNavContext.Provider>
            </div>
        </>
    );
};

export default MainPageNav;
export const useMainPageNavContext = () => {
    return useContext(MainPageNavContext);
};
