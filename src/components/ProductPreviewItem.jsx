import React from "react";
import styles from "./ProductPreviewItem.module.css";
import { formatPrice } from "../utils/priceFormatter";

const ProductPreviewItem = (props) => {
    return (
        <>
            <div className={styles["container"]}>
                <img src={props.product.imgSource || ""} className={styles["product-img"]}></img>
                <div className={styles["product-info"]}>
                    <div>số size, số màu sắc</div>
                    <h4 className={styles["product-title"]}>{props.product.title}</h4>
                    <div className={styles["product-price"]}>{formatPrice(props.product.price)}</div>
                    <div>Chọn màu</div>
                </div>
            </div>
        </>
    );
};

export default ProductPreviewItem;
