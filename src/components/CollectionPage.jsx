import React, { createContext, Suspense, useContext, useEffect, useState } from "react";
import styles from "./CollectionPage.module.css";
const apiURL = import.meta.env.VITE_API_URL;
import axios from "axios";
import { Await, defer, useLoaderData, useLocation, useNavigate, useSubmit } from "react-router-dom";
import Filter from "./Filter";
import { dummyProducts } from "../data/products";
import ProductPreviewItem from "./ProductPreviewItem";
import MainPageNav from "./MainPageNav";
import { urlMap } from "../utils/urlMapping";

const CollectionPageContext = createContext({});
/*
    params:
    + collectionName
    queryParams:
    + minRating
    + priceRange
    + sortBy
    + sortOrder
    + limit
    + page
*/
const loader = async ({ request, params }) => {
    try {
        const collectionSearchParam = urlMap[params.collectionName];
        const requestURL = new URL(request.url);
        const queryParams = new URLSearchParams(requestURL.search);
        queryParams.append("category", collectionSearchParam);
        let searchString = queryParams.toString();
        console.log("search string", searchString);
        const data = axios.get(`${apiURL}/products/search?${searchString}`).then((response) => response.data);
        return defer({ data });
    } catch (error) {
        console.log(error);
        return {};
    }
};

const action = async ({ request, params }) => {};

const CollectionPage = () => {
    const { data } = useLoaderData();
    const navigate = useNavigate();
    const location = useLocation();
    const [filterCondition, setFilterCondition] = useState({
        minRating: 0,
        priceRange: { min: -1, max: -1 },
        sortBy: "",
        sortOrder: "",
    });

    const priceRange = { min: 0, max: 9999999 };

    useEffect(() => {
        console.log(filterCondition);
        const queryString = new URLSearchParams();
        if (filterCondition.minRating !== 0) queryString.append("minRating", filterCondition.minRating);
        if (filterCondition.priceRange.min !== -1 && filterCondition.priceRange.max !== -1)
            queryString.append(
                "priceRange",
                `${Math.floor(filterCondition.priceRange.min)}-${Math.ceil(filterCondition.priceRange.max)}`
            );
        if (filterCondition.sortBy) queryString.append("sortBy", filterCondition.sortBy);
        if (filterCondition.sortOrder) queryString.append("sortOrder", filterCondition.sortOrder);
        navigate(`${location.pathname}?${queryString.toString()}`);
    }, [filterCondition]);

    const requestURL = () => {
        console.log("requestURL in CollectionPage");
    };

    return (
        <>
            <section className={styles["container"]}>
                <MainPageNav />
                <CollectionPageContext.Provider value={{ requestURL, filterCondition, setFilterCondition, priceRange }}>
                    <Filter />
                </CollectionPageContext.Provider>
                <Suspense fallback={<div>Loading...</div>}>
                    <Await resolve={data}>
                        {(data) => {
                            console.log(data.status);

                            return (
                                <>
                                    <div className={styles["product-flex-container"]}>
                                        {data.status === "success"
                                            ? data.data.products.map((product) => (
                                                  <ProductPreviewItem product={product} />
                                              ))
                                            : "Error"}
                                    </div>
                                </>
                            );
                        }}
                    </Await>
                </Suspense>
            </section>
        </>
    );
};

export default CollectionPage;
export { loader };
export const useCollectionPageContext = () => {
    return useContext(CollectionPageContext);
};
