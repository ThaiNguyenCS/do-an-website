import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import MainPage from "./components/MainPage.jsx";
import LoginScreen from './components/LoginScreen.jsx'
import NotFoundScreen from './components/NotFoundScreen.jsx';
import RegisterScreen from './components/RegisterScreen.jsx';
import CollectionPage, { loader as collectionPageLoader } from "./components/CollectionPage.jsx";
import SearchPage, { loader as searchPageLoader } from "./components/SearchPage.jsx";
import Cart from "./components/Cart.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <MainPage />,
            },
            {
                path: "collections/:collectionName",
                element: <CollectionPage />,
                loader: collectionPageLoader,
            },
            // payment screen
            {
                path: "cart/payment",
            },
            // view cart
            {
                path: "cart",
                element: <Cart />,
            },
            // view product detail
            {
                path: "product/:product",
            },
            {
                path: "login",
                element: <LoginScreen />,
            },
            {
                path: "register",
                element: <RegisterScreen />,
            },
            {
                path: "search",
                element: <SearchPage />,
                loader: searchPageLoader,
            },
            {
                path: "*",
                element: <NotFoundScreen />, // Route 404
            },
        ],
    },
]);


createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </StrictMode>
);
