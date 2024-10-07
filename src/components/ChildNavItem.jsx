import React from "react";
import styles from "./ChildNavItem.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useMainPageNavContext } from "./MainPageNav";
import { useCollectionPageContext } from "./CollectionPage";

const ChildNavItem = (props) => {
    const navigate = useNavigate();
    // const { activeChildNav, setActiveChildNav } = useMainPageNavContext();
    const { setFilterCondition, setOrderFilterCondition, activeChildNav, setActiveChildNav, isNavigate } =
        useCollectionPageContext();
    function navigateToCollection() {
        setActiveChildNav(props.item.link); // mark visited this link
        isNavigate.current = false;
        setFilterCondition({}); // reset filter
        setOrderFilterCondition(0); // reset filter
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
