import React, { useEffect, useRef, useState } from "react";
import styles from "./Collection.module.css";
import ProductPreviewItem from "./ProductPreviewItem";
import { dummyProducts } from "../data/products";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const Collection = (props) => {
    const sliderRef = useRef(null);
    const [leftButton, setLeftButton] = useState(false);
    const [rightButton, setRightButton] = useState(false);
    useEffect(() => {
        if (sliderRef.current) {
            const leftScroll = sliderRef.current.scrollLeft;
            const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
            if (leftScroll >= maxScroll) {
                setRightButton(false);
            } else {
                setRightButton(true);
            }
        }
    }, [sliderRef]);

    const slide = (distance) => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ top: 0, left: distance, behavior: "smooth" });
            const futureLeftScroll = sliderRef.current.scrollLeft + distance; // future position because smooth animation is asynchronous
            const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
            if (futureLeftScroll <= 0) setLeftButton(false);
            else {
                setLeftButton(true);
            }
            if (futureLeftScroll >= maxScroll) {
                setRightButton(false);
            } else {
                setRightButton(true);
            }
        }
    };
    return (
        <>
            <div className={"container"}>
                <h2 className={styles["collection-title"]}>Sản phẩm mới ra mắt</h2>
                {/* Or a banner representing the title */}
                <div className={styles["slider-wrapper"]}>
                    <div className={styles["product-slider-container"]} ref={sliderRef}>
                        {dummyProducts.map((item) => (
                            <ProductPreviewItem product={item} isFixedSize={true} />
                        ))}
                    </div>
                    {leftButton && (
                        <div
                            className={styles["slider-left-button"]}
                            onClick={() => {
                                slide(-400);
                            }}
                        >
                            <IoIosArrowBack className={styles["icon"]} />
                        </div>
                    )}
                    {rightButton && (
                        <div
                            className={styles["slider-right-button"]}
                            onClick={() => {
                                slide(400);
                            }}
                        >
                            <IoIosArrowForward className={styles["icon"]} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Collection;
