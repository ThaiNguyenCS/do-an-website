import React from "react";
import styles from "./ChildNavItem.module.css";

const ChildNavItem = (props) => {
    return (
        <>
            <li className={styles["nav-item"]}>
                <div className={`${styles["nav-icon-container"]}`}>
                    <img src="" alt="" className={styles["nav-icon"]} />
                </div>
                <div className={styles["nav-title"]}>{props.item.title}</div>
            </li>
        </>
    );
};
export default ChildNavItem;
