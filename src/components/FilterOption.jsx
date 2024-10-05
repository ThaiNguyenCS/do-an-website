import React, { useState } from "react";
import styles from "./FilterOption.module.css";
import { IoIosArrowDown } from "react-icons/io";
import PriceSlider from "./PriceSlider";

const options = [
    { name: "Màu sắc", options: [] },
    { name: "Khoảng giá", range: [0, 4000000] },
];

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
                <div className={styles["filter-title"]}>{options[props.optionNum].name}</div>
                <IoIosArrowDown className={styles["arrow-icon"]} />
                <div
                    className={`${styles["filter-option-list"]} ${
                        props.isExpand === props.optionNum ? styles["active"] : ""
                    }`}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    {props.optionNum === 1 ? <PriceSlider range={options[1].range} /> : ""}
                </div>
            </div>
        </>
    );
};

export default FilterOption;
