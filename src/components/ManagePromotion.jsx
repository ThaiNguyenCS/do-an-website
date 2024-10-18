import React, { useEffect, useState } from "react";
import styles from "./ManagePromotion.module.css";
import Promotion from "./Promotion";
import axios from "axios";
import { authConfig } from "../utils/axiosConfig";
import PromotionModifyPopup from "./PromotionModifyPopup";
import PromotionAddPopup from "./PromotionAddPopup";
const apiURL = import.meta.env.VITE_API_URL;

const ManagePromotion = () => {
    const [promotions, setPromotions] = useState([]);
    const [modifyPopup, setModifyPopup] = useState({ display: false, promotion: null });
    const [addPopup, setAddPopup] = useState(false);

    async function getPromotions() {
        try {
            const response = await axios.get(`${apiURL}/promotion`, authConfig);
            const data = response.data;
            if (data.status === "success") {
                setPromotions(data.data.promotions);
            }
        } catch (error) {
            console.error(error);
            alert(`Có lỗi xảy ra, vui lòng thử lại sau ${error.response.data.message}`);
        }
    }

    async function deletePromotion(promotion, itemContainer, disappearStyle) {
        if (promotion) {
            try {
                const response = await axios.delete(`${apiURL}/promotion/${promotion._id}`, authConfig);
                const data = response.data;
                if (data.status === "success") {
                    if (itemContainer) {
                        itemContainer.classList.add(disappearStyle); // run disappear anim
                    }
                    setTimeout(() => {
                        getPromotions(); // refetch data
                    }, 300);
                } else {
                    alert("Có lỗi xảy ra, vui lòng thử lại sau");
                }
            } catch (error) {
                console.error(error);
                alert(`Có lỗi xảy ra, vui lòng thử lại sau ${error.response.data.message}`);
            }
        }
    }

    async function modifyPromotion(promotion) {
        try {
            promotion.discountPercent = parseInt(promotion.discountPercent);
            const response = await axios.put(`${apiURL}/promotion/${promotion._id}`, promotion, authConfig);
            const data = response.data;
            if (data.status === "success") {
                getPromotions(); // refetch data
            } else {
                alert("Có lỗi xảy ra, vui lòng thử lại sau");
            }
        } catch (error) {
            console.error(error);
            alert("Có lỗi xảy ra, vui lòng thử lại sau");
        } finally {
            setModifyPopup({ display: false, promotion: null });
        }
    }

    async function addPromotion(promotion) {
        try {
            promotion.discountPercent = parseInt(promotion.discountPercent);
            const response = await axios.post(`${apiURL}/promotion`, promotion, authConfig);
            const data = response.data;
            if (data.status === "success") {
                getPromotions(); // refetch data
                alert(`Tạo khuyến mãi thành công`);
            }
        } catch (error) {
            console.error(error);
            alert(`Có lỗi xảy ra, vui lòng thử lại sau ${error.response.data.message}`);
        } finally {
            setAddPopup(false);
        }
    }

    useEffect(() => {
        getPromotions();
    }, []);

    return (
        <>
            <div className={styles["container"]}>
                <h2>Quản lý khuyến mãi</h2>
                <button
                    className={styles["add-button"]}
                    onClick={(e) => {
                        e.stopPropagation();
                        setAddPopup(true);
                    }}
                >
                    Tạo khuyến mãi
                </button>
                <div className={styles["promotion-container"]}>
                    {promotions.length > 0 &&
                        promotions.map((item) => (
                            <Promotion
                                key={item._id}
                                item={item}
                                deletePromotion={deletePromotion}
                                displayPopup={setModifyPopup}
                            ></Promotion>
                        ))}
                </div>
            </div>
            {modifyPopup.display ? (
                <PromotionModifyPopup
                    displayPopup={setModifyPopup}
                    promotion={modifyPopup.promotion}
                    modifyPromotion={modifyPromotion}
                />
            ) : (
                ""
            )}

            {addPopup ? <PromotionAddPopup displayPopup={setAddPopup} addPromotion={addPromotion} /> : ""}
        </>
    );
};

export default ManagePromotion;
