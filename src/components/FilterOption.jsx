import React, { useState } from "react";
import styles from "./FilterOption.module.css";
import { IoIosArrowDown } from "react-icons/io";

const FilterOption = (props) => {
    return (
        <>
            <div
                className={styles["container"]}
                onClick={() => {
                    if (props.isExpand === props.optionNum) {
                        props.setExpand(-1);
                    } else {
                        props.setExpand(props.optionNum);
                    }
                }}
            >
                <div className={styles["filter-title"]}>Màu sắc</div>
                <IoIosArrowDown className={styles["arrow-icon"]} />
                {props.isExpand === props.optionNum && <div className={styles["filter-option-list"]}></div>}
            </div>
        </>
    );
};

export default FilterOption;
