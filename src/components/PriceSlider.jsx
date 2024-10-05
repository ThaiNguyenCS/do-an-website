import React, { useEffect, useRef, useState } from "react";
import styles from "./PriceSlider.module.css";
import { formatPrice } from "../utils/priceFormatter";

const PriceSlider = (props) => {
    const leftKnobRef = useRef(null);
    const rightKnobRef = useRef(null);
    const sliderRef = useRef(null);
    const [min, setMin] = useState(formatPrice(props.range[0] || 0));
    const [max, setMax] = useState(formatPrice(props.range[1] || 9999999));

    useEffect(() => {
        if (leftKnobRef.current) {
            let halfKnobWidth = 8; // half width of the knob
            function reposition(e) {
                console.log(halfKnobWidth);

                let distance = e.clientX - halfKnobWidth - sliderRef.current.getBoundingClientRect().left;
                // from the left boundary to the MIDDLE of the knob
                // console.log(e.clientX + halfKnobWidth , rightKnobRef.current.getBoundingClientRect().left);

                if (distance <= 0) {
                    // if the MIDDLE of the knob is over the left boundary then stop
                    leftKnobRef.current.style.left = "0px";
                    setMin(formatPrice(props.range[0]));
                } else if (e.clientX + halfKnobWidth >= rightKnobRef.current.getBoundingClientRect().left) {
                } else {
                    leftKnobRef.current.style.left = distance + "px";
                    const percentage = distance / sliderRef.current.getBoundingClientRect().width;
                    setMin(formatPrice(percentage * props.range[1]));
                }
            }

            // halfKnobWidth = leftKnobRef.current.getBoundingClientRect().width / 2;

            leftKnobRef.current.addEventListener("mousedown", (e) => {
                document.addEventListener("mousemove", reposition);
            });
            document.addEventListener("mouseup", () => {
                document.removeEventListener("mousemove", reposition);
            });
        }
    }, [leftKnobRef]);

    useEffect(() => {
        if (rightKnobRef.current) {
            let halfKnobWidth = 8;
            function reposition(e) {
                const sliderWidth = sliderRef.current.getBoundingClientRect().width;
                let distance = e.clientX - halfKnobWidth - sliderRef.current.getBoundingClientRect().left;
                if (distance + 2 * halfKnobWidth >= sliderWidth) {
                    rightKnobRef.current.style.left = sliderWidth - 2 * halfKnobWidth;
                    setMax(formatPrice(props.range[1]));
                } else if (e.clientX - halfKnobWidth <= leftKnobRef.current.getBoundingClientRect().right) {
                } else {
                    rightKnobRef.current.style.left = distance + "px";
                    const percentage = (distance + 2 * halfKnobWidth) / sliderWidth;
                    setMax(formatPrice(percentage * props.range[1]));
                }
            }
            // halfKnobWidth = rightKnobRef.current.getBoundingClientRect().width / 2;
            rightKnobRef.current.addEventListener("mousedown", () => {
                document.addEventListener("mousemove", reposition);
            });
            document.addEventListener("mouseup", () => {
                document.removeEventListener("mousemove", reposition);
            });
        }
    }, [rightKnobRef]);

    const applyPriceFilter = () => {};

    const cancelFilter = () => {};

    return (
        <>
            <div className={styles["container"]}>
                <div className={styles["amount-wrapper"]}>
                    <span style={{ fontWeight: 500 }}>Khoảng giá:</span> {min} - {max}
                </div>
                <div ref={sliderRef} className={styles["slider"]}>
                    <div style={{ left: "0px" }} ref={leftKnobRef} className={styles["slider-left-knob"]}></div>
                    <div style={{ left: "90%" }} ref={rightKnobRef} className={styles["slider-right-knob"]}></div>
                </div>
                <div className={styles["action-container"]}>
                    <button className={styles["apply-button"]}>Áp dụng</button>
                    <button className={styles["cancel-button"]}>Hủy</button>
                </div>
            </div>
        </>
    );
};

export default PriceSlider;
