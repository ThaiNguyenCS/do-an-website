import React from "react";
import styles from "./PageNavigation.module.css";
const PageNavigation = (props) => {
    // currentPage, maxPage, limit
    const { pageOption, setPageOption } = props;

    const generateControlButton = () => {
        console.log("generateControlButton");

        const pageButtonArr = [];
        let startingPoint = 1; // default is the first page
        if (pageOption.page === 1) {
        } else if (pageOption.page === pageOption.maxPage) {
            startingPoint = pageOption.maxPage - 2;
        } else {
            startingPoint = pageOption.page - 1;
        }
        startingPoint = Math.max(startingPoint, 1); // ensure the min is always 1
        for (let p = startingPoint; p <= Math.min(startingPoint + 2, pageOption.maxPage); p++) {
            pageButtonArr.push(
                <div
                    className={`${styles["button"]} ${p === pageOption.page ? styles["active"] : ""}`}
                    onClick={() => handleTurnPage(p)}
                >
                    {p}
                </div>
            );
        }

        return (
            <>
                <div
                    className={`${styles["button"]} ${pageOption.page === 1 ? styles["hidden"] : ""}`}
                    onClick={() => handleTurnPage(1)}
                >
                    &lt;&lt;
                </div>
                <div
                    className={`${styles["button"]} ${pageOption.page === 1 ? styles["hidden"] : ""}`}
                    onClick={() => handleTurnPage(pageOption.page - 1)}
                >
                    &lt;
                </div>
                {pageButtonArr.map((button) => button)}
                <div
                    className={`${styles["button"]} ${pageOption.page === pageOption.maxPage ? styles["hidden"] : ""}`}
                    onClick={() => handleTurnPage(pageOption.page + 1)}
                >
                    &gt;
                </div>
                <div
                    className={`${styles["button"]} ${pageOption.page === pageOption.maxPage ? styles["hidden"] : ""}`}
                    onClick={() => handleTurnPage(pageOption.maxPage)}
                >
                    &gt;&gt;
                </div>
            </>
        );
    };

    const handleTurnPage = (page) => {
        if (page !== pageOption.page && page > 0 && page <= pageOption.maxPage) {
            setPageOption((state) => ({ ...state, page }));
        }
    };

    return (
        <>
            <div className={styles["container"]}>{generateControlButton()}</div>
        </>
    );
};

export default PageNavigation;
