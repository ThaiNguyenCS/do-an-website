import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import MainPage from './components/MainPage.jsx';
import LoginScreen from './screen/LoginScreen.jsx'
import NotFoundScreen from './screen/NotFoundScreen.jsx';
import RegisterScreen from './screen/RegisterScreen.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '',
				element: <MainPage />,
			},
			// view a specific collection

			{
				path: 'collections/:collectionName',
			},
			// payment screen
			{
				path: 'cart/payment',
			},
			// view cart
			{
				path: 'cart',
			},
			// view product detail
			{
				path: 'product/:product',
			},
			{
				path: 'login',
				element: <LoginScreen />,
			},
			{
				path: 'register',
				element: <RegisterScreen />,
			},
			{
				path: '*',
				element: <NotFoundScreen />, // Route 404
			},
		],
	},
]);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<RouterProvider router={router}></RouterProvider>
	</StrictMode>
);
