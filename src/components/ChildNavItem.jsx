import React from "react";
import styles from "./ChildNavItem.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useMainPageNavContext } from "./MainPageNav";

const ChildNavItem = (props) => {
    const navigate = useNavigate();
    const { activeChildNav, setActiveChildNav } = useMainPageNavContext();
    function navigateToCollection() {
        setActiveChildNav(props.item.link); // mark visited this link
        navigate(props.item.link);
    }
    return (
        <>
            <li className={styles["nav-item"]}>
                <div
                    className={`${styles["nav-icon-container"]} ${
                        activeChildNav === props.item.link ? styles["active"] : ""
                    }`}
                    onClick={(e) => {
                        e.stopPropagation();
                        navigateToCollection();
                    }}
                >
                    <img src="" alt="" className={styles["nav-icon"]} />
                </div>
                <div
                    className={styles["nav-title"]}
                    onClick={(e) => {
                        e.stopPropagation();
                        navigateToCollection();
                    }}
                >
                    {props.item.title}
                </div>
            </li>
        </>
    );
};
export default ChildNavItem;
