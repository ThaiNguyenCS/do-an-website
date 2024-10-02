import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            // view a specific collection
            {
                path: "collection/:collectionName",
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
