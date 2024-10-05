import React from "react";
import styles from "./SearchBar.module.css";
import { GoSearch } from "react-icons/go";
const SearchBar = () => {
    return (
        <>
            <div className={styles["container"]}>
                <label htmlFor="search-input">Tìm kiếm sản phẩm bạn đang quan tâm</label>
                <div className={styles["search-bar"]}>
                    <div className={styles["search-icon-container"]}>
                        <GoSearch className={styles['icon']}/>
                    </div>

                    <input
                        id="search-input"
                        type="text"
                        className={styles["search-input"]}
                        placeholder="Nhập tên sản phẩm..."
                    />
                </div>
            </div>
        </>
    );
};

export default SearchBar;
