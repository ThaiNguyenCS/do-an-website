import React from "react";
import styles from "./Header.module.css";
import dropMenuStyles from "./DropdownMenu.module.css";
import dummyLogo from "../assets/dummy_logo.png";
import { FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import DropdownMenu from "./DropdownMenu";
import { Link } from "react-router-dom";
// logo + name, navigation, cart

export const giaynamnavs = [
    { title: "Giày chạy bộ", link: "/collections/giay-chay-bo-nam" },
    { title: "Giày cầu lông", link: "/collections/giay-cau-long-nam" },
    { title: "Giày tây", link: "/collections/giay-tay-nam" },
    { title: "Giày đá bóng", link: "/collections/giay-da-bong-nam" },
    { title: "Sandal", link: "/collections/sandal-nam" },
];

export const giaynunavs = [
    { title: "Giày chạy bộ", link: "/abc" },
    { title: "Giày cầu lông", link: "/abc" },
    { title: "Giày cao gót", link: "/abc" },
    { title: "Giày búp bê", link: "/abc" },
    { title: "Sandal", link: "/abc" },
    { title: "Boot", link: "/abc" },
];

export const giayTreEmNavs = [
    { title: "Giày thể thao", link: "/abc" },
    { title: "Sandal", link: "/abc" },
    { title: "Dép", link: "/abc" },
];

const Header = () => {
    return (
        <>
            <div className={styles["container"]}>
                <div className={styles["logo-container"]}>
                    <img src={dummyLogo} alt="App Logo" className={styles["app-logo"]} />
                </div>
                <nav className={styles["navigation-container"]}>
                    <div className={styles["nav-button-container"]}>
                        GIÀY NAM
                        <div className={styles["dropdown-menu-wrapper"]}>
                            <DropdownMenu navList={giaynamnavs} />
                        </div>
                    </div>
                    <div className={styles["nav-button-container"]}>
                        GIÀY NỮ
                        <div className={styles["dropdown-menu-wrapper"]}>
                            <DropdownMenu navList={giaynunavs} />
                        </div>
                    </div>
                    <div className={styles["nav-button-container"]}>
                        TRẺ EM
                        <div className={styles["dropdown-menu-wrapper"]}>
                            <DropdownMenu navList={giayTreEmNavs} />
                        </div>
                    </div>
                </nav>
                <div className={styles["action-container"]}>
                    <div className={styles["action-button"]} style={{ marginRight: "10px" }}>
                        <FaRegUser className={styles["action-icon"]} />
                    </div>
                    <div className={styles["action-button"]}>
                        <FiShoppingCart className={styles["action-icon"]} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
