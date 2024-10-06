import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from "./SelectedFilterOption.module.css";


const SelectedFilterOption = (props) => {
    console.log(props.entry);
    
    return (
        <>
            <li className={styles["container"]}>
                <span className={styles["filter-name"]}>{props.entry[0]}</span>
                <IoIosCloseCircleOutline className={styles["cancel-icon"]}></IoIosCloseCircleOutline>
            </li>
        </>
    );
};

export default SelectedFilterOption;
