import React, { createContext, useContext, useState } from "react";
import styles from "./Filter.module.css";
import IcFilter from "../assets/filter.svg";
import FilterOption from "./FilterOption";
import { useCollectionPageContext } from "./CollectionPage";
import SelectedFilterOption from "./SelectedFilterOption";

const FilterContext = createContext({});

const Filter = () => {
    const [expand, setExpand] = useState(-1);
    const { filterCondition, setFilterCondition } = useCollectionPageContext();

    return (
        <>
            <div className={styles["container"]}>
                <div className={styles["options"]}>
                    <div className={styles["left-section"]}>
                        <img src={IcFilter} alt="Filter Icon" style={{ width: "1.5rem" }} />
                        <FilterContext.Provider value={{ expand, setExpand }}>
                            <FilterOption optionNum={0} />
                            <FilterOption optionNum={1} />
                        </FilterContext.Provider>
                    </div>
                </div>
                <ul className={styles["selected-options"]}>
                    {Object.entries(filterCondition).map((entry) => (
                        <SelectedFilterOption entry={entry}></SelectedFilterOption>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Filter;
export const useFilterContext = () => {
    return useContext(FilterContext);
};
