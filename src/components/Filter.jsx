import React, { useState } from "react";
import styles from "./Filter.module.css";
import IcFilter from "../assets/filter.svg";
import FilterOption from "./FilterOption";

const Filter = () => {
    const [expand, setExpand] = useState(-1);
    return (
        <>
            <div className={styles["container"]}>
                <div className={styles["options"]}>
                    <div className={styles["left-section"]}>
                        <img src={IcFilter} alt="Filter Icon" style={{ width: "1.5rem" }} />
                        <FilterOption isExpand={expand} optionNum={0} setExpand={setExpand}/>
                        <FilterOption isExpand={expand} optionNum={1} setExpand={setExpand}/>
                        <FilterOption isExpand={expand} optionNum={2} setExpand={setExpand}/>
                    </div>
                </div>
                <div className={styles["seleted-options"]}></div>
            </div>
        </>
    );
};

export default Filter;
