import React from "react";
import styles from "./Header.module.css";
import dummyLogo from "../assets/dummy_logo.png";
// logo + name, navigation, cart

const Header = () => {
    return (
        <>
            <div className={styles["container"]}>
                <div className={styles["logo-container"]}>
                    <img src={dummyLogo} alt="App Logo" className={styles["app-logo"]} />
                </div>
                <nav className={styles["navigation-container"]}>
                    <div className={styles["nav-button-container"]}>Giày nam</div>
                    <div className={styles["nav-button-container"]}>Giày nữ</div>
                    <div className={styles["nav-button-container"]}>Giày trẻ em</div>
                </nav>
                <div className={styles["action-container"]}></div>
            </div>
        </>
    );
};

export default Header;
