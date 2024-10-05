import React from "react";
import styles from "./ChildNavItem.module.css";
import { Link } from "react-router-dom";

const ChildNavItem = (props) => {
    return (
        <>
            <li className={styles["nav-item"]}>
                <Link to={props.item.link}>
                    <div className={`${styles["nav-icon-container"]}`}>
                        <img src="" alt="" className={styles["nav-icon"]} />
                    </div>
                    <div className={styles["nav-title"]}>{props.item.title}</div>
                </Link>
            </li>
        </>
    );
};
export default ChildNavItem;
