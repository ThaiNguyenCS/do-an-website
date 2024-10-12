import React, { useState, useEffect } from "react";
import { FaStar, FaTrash, FaCreditCard, FaTruck, FaShoppingCart } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import "../index.css"
import axios from "axios";
const Cart = () => {
    const [cart, setCart] = useState([]);
    const [creditCard, setCreditCard] = useState({
        number: "",
        name: "",
        expiry: "",
        cvv: "",
    });

    const [shippingMethod, setShippingMethod] = useState("standard");
    const [paymentMethod, setPaymentMethod] = useState("credit");
    const [orderCreated, setOrderCreated] = useState(false);
    const [orderStatus, setOrderStatus] = useState("");
    const [orderId, setOrderId] = useState(null);

    const shippingCosts = {
        standard: 5.99,
        express: 12.99,
        overnight: 19.99,
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await axios.get("https://domstore.azurewebsites.net/api/v1/carts");
            setCart(response.data);
        } catch (error) {
            console.error("Lỗi khi tải giỏ hàng:", error);
        }
    };

    const updateQuantity = async (id, newQuantity) => {
        try {
            await axios.put(`https://domstore.azurewebsites.net/api/v1/carts`, {
                id,
                quantity: newQuantity,
            });
            fetchCart();
        } catch (error) {
            console.error("Lỗi khi cập nhật số lượng:", error);
        }
    };

    const removeItem = async (id) => {
        try {
            await axios.delete(`https://domstore.azurewebsites.net/api/v1/carts`, { data: { id } });
            fetchCart();
        } catch (error) {
            console.error("Lỗi khi xóa mặt hàng:", error);
        }
    };

    const addItem = async (item) => {
        try {
            await axios.post("https://domstore.azurewebsites.net/api/v1/carts", item);
            fetchCart();
        } catch (error) {
            console.error("Lỗi khi thêm mặt hàng:", error);
        }
    };

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    const shipping = shippingCosts[shippingMethod];
    const total = subtotal + tax + shipping;

    const handleCreditCardChange = (e) => {
        setCreditCard({ ...creditCard, [e.target.name]: e.target.value });
    };

    const createOrder = async () => {
        try {
            const orderData = {
                items: cart,
                shippingMethod,
                paymentMethod,
                total,
            };
            const response = await axios.post("https://domstore.azurewebsites.net/api/v1/orders", orderData);
            setOrderCreated(true);
            setOrderId(response.data.id);
            setOrderStatus(`Đặt hàng thành công! Số theo dõi: ${response.data.trackingNumber}`);
        } catch (error) {
            console.error("Lỗi khi tạo đơn hàng:", error);
            setOrderStatus("Không thể tạo đơn hàng. Vui lòng thử lại.");
        }
    };

    const trackOrder = async () => {
        if (!orderId) return;
        try {
            const response = await axios.get(`https://domstore.azurewebsites.net/api/v1/orders/${orderId}`);
            setOrderStatus(`Trạng thái đơn hàng của bạn: ${response.data.status}`);
        } catch (error) {
            console.error("Lỗi khi theo dõi đơn hàng:", error);
            setOrderStatus("Không thể lấy trạng thái đơn hàng. Vui lòng thử lại.");
        }
    };

    return (
        <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center">Giỏ Hàng Giày</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Các Mặt Hàng Trong Giỏ</h2>
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between mb-4 pb-4 border-b">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                            <div className="flex-grow ml-4">
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-gray-600">Kích cỡ: {item.size}</p>
                                <div className="flex items-center mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={
                                                i < Math.floor(item.rating) ? "text-yellow-400" : "text-gray-300"
                                            }
                                        />
                                    ))}
                                    <span className="ml-1 text-sm text-gray-600">({item.rating})</span>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                    className="w-16 px-2 py-1 border rounded mr-2"
                                />
                                <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
                                    <FaTrash />
                                </button>
                            </div>
                            <p className="font-semibold ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Tóm Tắt Đơn Hàng</h2>
                    <div className="flex justify-between mb-2">
                        <span>Tổng phụ:</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Thuế:</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Phí vận chuyển:</span>
                        <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg mt-4">
                        <span>Tổng cộng:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <div className="mt-6">
                        <h3 className="font-semibold mb-2">Phương Thức Vận Chuyển</h3>
                        <select
                            value={shippingMethod}
                            onChange={(e) => setShippingMethod(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="standard">Vận chuyển Tiêu chuẩn - $5.99</option>
                            <option value="express">Vận chuyển Nhanh - $12.99</option>
                            <option value="overnight">Vận chuyển Hỏa tốc - $19.99</option>
                        </select>
                    </div>

                    <div className="mt-6">
                        <h3 className="font-semibold mb-2">Phương Thức Thanh Toán</h3>
                        <div className="flex items-center mb-2">
                            <input
                                type="radio"
                                id="credit"
                                name="paymentMethod"
                                value="credit"
                                checked={paymentMethod === "credit"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="mr-2"
                            />
                            <label htmlFor="credit">Thẻ Tín Dụng</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="cod"
                                name="paymentMethod"
                                value="cod"
                                checked={paymentMethod === "cod"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="mr-2"
                            />
                            <label htmlFor="cod">Thanh Toán Khi Nhận Hàng</label>
                        </div>
                    </div>

                    {paymentMethod === "credit" && (
                        <div className="mt-6">
                            <h3 className="font-semibold mb-2">Chi Tiết Thẻ Tín Dụng</h3>
                            <input
                                type="text"
                                name="number"
                                placeholder="Số Thẻ"
                                value={creditCard.number}
                                onChange={handleCreditCardChange}
                                className="w-full p-2 border rounded mb-2"
                            />
                            <input
                                type="text"
                                name="name"
                                placeholder="Tên Trên Thẻ"
                                value={creditCard.name}
                                onChange={handleCreditCardChange}
                                className="w-full p-2 border rounded mb-2"
                            />
                            <div className="flex justify-between">
                                <input
                                    type="text"
                                    name="expiry"
                                    placeholder="MM/YY"
                                    value={creditCard.expiry}
                                    onChange={handleCreditCardChange}
                                    className="w-1/2 p-2 border rounded mr-2"
                                />
                                <input
                                    type="text"
                                    name="cvv"
                                    placeholder="CVV"
                                    value={creditCard.cvv}
                                    onChange={handleCreditCardChange}
                                    className="w-1/2 p-2 border rounded"
                                />
                            </div>
                        </div>
                    )}

                    <button
                        onClick={createOrder}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded mt-6 hover:bg-blue-700 transition duration-200"
                    >
                        Tạo Đơn Hàng
                    </button>
                </div>
            </div>

            {orderCreated && (
                <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Theo Dõi Đơn Hàng</h2>
                    <p className="mb-4">{orderStatus}</p>
                    <button
                        onClick={trackOrder}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
                    >
                        Kiểm Tra Trạng Thái Đơn Hàng
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
