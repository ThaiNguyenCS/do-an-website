import React, { useState } from "react";
import styles from "./AdminSidebarNav.module.css";
import IcPromotion from "../assets/ic_promotion.jsx";
import IcVoucher from "../assets/ic_voucher.jsx";
import IcOrder from "../assets/ic_order.jsx";
import IcSupport from "../assets/ic_support.jsx";
import IcReport from "../assets/ic_report.jsx";
import IcProduct from "../assets/ic_product.jsx";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slicers/appSlicer.js";
const AdminSidebarNav = (props) => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const navigate = useNavigate();
    const { expand, setExpand } = props;
    function navigateToSubsection(e) {
        const link = e.target.dataset.link;
        navigate(link);
    }

    return (
        <>
            <div className={`${styles["container"]} ${expand ? styles["expand"] : ""}`}>
                <div className={styles["header"]}>
                    {expand ? <h2>Đóm Store</h2> : ""}
                    <IoIosArrowBack
                        className={styles["toggle-icon"]}
                        onClick={(e) => {
                            e.stopPropagation();
                            setExpand(!expand);
                        }}
                    />
                </div>
                <div className={styles["divider"]}></div>
                <div
                    className={styles["nav-item-container"]}
                    data-link={"/admin/promotions"}
                    onClick={(e) => {
                        navigateToSubsection(e);
                    }}
                >
                    <IcPromotion className={styles["nav-icon"]} />
                    {expand ? <span>Quản lý khuyến mãi</span> : ""}
                </div>
                <div
                    className={styles["nav-item-container"]}
                    data-link={"/admin/vouchers"}
                    onClick={(e) => {
                        navigateToSubsection(e);
                    }}
                >
                    <IcVoucher className={styles["nav-icon"]} />
                    {expand ? <span>Quản lý voucher</span> : ""}
                </div>
                <div
                    className={styles["nav-item-container"]}
                    data-link={"/admin/products"}
                    onClick={(e) => {
                        navigateToSubsection(e);
                    }}
                >
                    <IcProduct className={styles["nav-icon"]} />
                    {expand ? <span>Quản lý sản phẩm</span> : ""}
                </div>
                <div
                    className={styles["nav-item-container"]}
                    data-link={"/admin/orders"}
                    onClick={(e) => {
                        navigateToSubsection(e);
                    }}
                >
                    <IcOrder className={styles["nav-icon"]} />
                    {expand ? <span>Quản lý đơn hàng</span> : ""}
                </div>

                <div className={styles["divider"]}></div>

                <div
                    className={styles["nav-item-container"]}
                    data-link={"/admin/reports"}
                    onClick={(e) => {
                        navigateToSubsection(e);
                    }}
                >
                    <IcReport className={styles["nav-icon"]} />
                    {expand ? <span>Báo cáo</span> : ""}
                </div>
                <div
                    className={styles["nav-item-container"]}
                    onClick={(e) => {
                        navigateToSubsection(e);
                    }}
                >
                    <IcSupport className={styles["nav-icon"]} />
                    {expand ? <span>Hỗ trợ khách hàng</span> : ""}
                </div>
                <div className={styles["divider"]}></div>
                <div
                    className={styles["nav-item-container"]}
                    onClick={(e) => {
                        handleLogout();
                    }}
                >
                    <BsFillDoorOpenFill className={styles["nav-icon"]} />
                    {expand ? <span>Đăng xuất</span> : ""}
                </div>
            </div>
        </>
    );
};

export default AdminSidebarNav;
