import React from "react";
import MainPageNav from "./MainPageNav";
import styles from "./MainPage.module.css";
import ProductPreviewItem from "./ProductPreviewItem";
import { dummyProducts } from "../data/products";
import Filter from "./Filter";
// some banners
// some preview collections (hot trend, ...)

const MainPage = () => {
    return (
        <>
            <div className={styles["container"]}>
                <MainPageNav />
                <Filter />
                <div className={styles["product-flex-container"]}>
                    {dummyProducts.map((product) => (
                        <ProductPreviewItem product={product} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default MainPage;
