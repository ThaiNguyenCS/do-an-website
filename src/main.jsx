import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import MainPage from "./components/MainPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <MainPage />,
            },
            // view a specific collection

            {
                path: "collections/:collectionName",
            },
            // payment screen
            {
                path: "cart/payment",
            },
            // view cart
            {
                path: "cart",
            },
            // view product detail
            {
                path: "product/:product",
            },
            {
                path: "login",
            },
            {
                path: "signup",
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </StrictMode>
);
