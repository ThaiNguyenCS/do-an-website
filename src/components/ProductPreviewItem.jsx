import React from "react";
import styles from "./ProductPreviewItem.module.css";
import { formatPrice } from "../utils/priceFormatter";
import { FaStar } from "react-icons/fa";

const ProductPreviewItem = (props) => {
    // console.log(props.product);

    return (
        <>
            <div className={`${styles["container"]} ${props.isFixedSize ? styles["fixed-size"] : ""}`}>
                <img src={props.product.imageUrl[0] || ""} className={styles["product-img"]}></img>
                <div className={styles["product-info"]}>
                    <div className={styles["size-color-container"]}>
                        <span>{props.product.totalColors} Màu sắc</span>
                        <span>{props.product.totalSizes} Size</span>
                    </div>
                    <div className={styles["rating-section"]}>
                        <FaStar className={styles["icon"]} />
                        <span>{props.product.totalRate || "No rating"}</span>
                    </div>
                    <h4 className={styles["product-title"]}>{props.product.name}</h4>
                    <div className={styles["product-price"]}>{formatPrice(props.product.price)}</div>
                    <div>Chọn màu</div>
                </div>
            </div>
        </>
    );
};

export default ProductPreviewItem;
