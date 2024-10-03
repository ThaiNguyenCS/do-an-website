import React from "react";
import styles from "./DropdownMenu.module.css";
import { useNavigate } from "react-router-dom";
const DropdownMenu = (props) => {
    const navigate = useNavigate();
    return (
        <>
            <div className={styles["container"]}>
                {props.navList &&
                    props.navList.length > 0 &&
                    props.navList.map((item) => <div className={styles["item"]}>{item.title}</div>)}
            </div>
        </>
    );
};

export default DropdownMenu;
