import styles from "./Header.module.css";
import dropMenuStyles from "./DropdownMenu.module.css";
import Logo from "../assets/logo.jsx";
import { FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import DropdownMenu from "./DropdownMenu";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slicers/appSlicer";

// logo + name, navigation, cart

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const appStatus = useSelector((state) => state.appState);
    console.log(appStatus);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <>
            <div className={styles["container"]}>
                <div className={styles["logo-container"]}>
                    <Link to={"/"}>
                        <Logo width={"220px"} />
                    </Link>
                </div>
                <nav className={styles["navigation-container"]}>
                    <div className={styles["nav-button-container"]}>
                        GIÀY NAM
                        <div className={styles["dropdown-menu-wrapper"]}>
                            <DropdownMenu parentNav={0} />
                        </div>
                    </div>
                    <div className={styles["nav-button-container"]}>
                        GIÀY NỮ
                        <div className={styles["dropdown-menu-wrapper"]}>
                            <DropdownMenu parentNav={1} />
                        </div>
                    </div>
                    <div className={styles["nav-button-container"]}>
                        TRẺ EM
                        <div className={styles["dropdown-menu-wrapper"]}>
                            <DropdownMenu parentNav={2} />
                        </div>
                    </div>
                </nav>
                <div className={styles["action-container"]}>
                    {appStatus?.role === "ADMIN" || appStatus?.role === "OWNER" ? (
                        <div
                            className={styles["link"]}
                            onClick={() => {
                                navigate("/admin");
                            }}
                        >
                            Vào trang quản lý
                        </div>
                    ) : (
                        ""
                    )}
                    {appStatus?.isLoggedIn ? (
                        <>
                            <div className="flex items-center cursor-pointer mr-4" onClick={handleLogout}>
                                <IoMdLogOut className="text-lg" />
                            </div>
                            <div
                                className="flex items-center cursor-pointer mr-2.5"
                                onClick={() => navigate("/profile")}
                            >
                                <FaRegUser className="text-lg" />
                            </div>
                        </>
                    ) : (
                        <div className="mr-2.5">
                            <Link to="/login" className="text-black hover:underline">
                                Đăng nhập
                            </Link>
                        </div>
                    )}

                    <div
                        className={styles["action-button"]}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate("/cart");
                        }}
                    >
                        <FiShoppingCart className={styles["action-icon"]} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
