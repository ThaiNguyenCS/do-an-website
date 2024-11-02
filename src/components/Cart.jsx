import React, { useState, useEffect } from "react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authConfig } from "../utils/axiosConfig";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    instructions: ""
  });
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [errors, setErrors] = useState({});

  const shippingOptions = {
    standard: { price: 5, time: "giao hàng tiết kiệm " },
    express: { price: 15, time: "giao hàng nhanh" },
    same_day: { price: 25, time: "Giao hàng hỏa tốc" }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("https://domstore.azurewebsites.net/api/v1/carts", authConfig);
      const transformedData = response.data.map(item => ({
        id: item.product_id || Math.random().toString(),
        quantity: item.quantity,
        color: item.color,
        size: item.size,
        name: item.name,
        price: item.price,
        image: item.image
      }));
      setCartItems(transformedData);
      setLoading(false);
    } catch (error) {
      toast.error("Không thể tải giỏ hàng");
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      await axios.put(`https://domstore.azurewebsites.net/api/v1/carts`, {
        product_id: itemId,
        quantity: newQuantity,
        color: cartItems.find(item => item.id === itemId)?.color,
        size: cartItems.find(item => item.id === itemId)?.size
      }, authConfig);
      fetchCartItems();
      toast.success("Cập nhật giỏ hàng thành công");
    } catch (error) {
      toast.error("Không thể cập nhật số lượng");
    }
  };

  const removeItem = async (itemId) => {
    try {
      await axios.delete(`https://domstore.azurewebsites.net/api/v1/carts/${itemId}`, authConfig);
      fetchCartItems();
      toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
    } catch (error) {
      toast.error("Không thể xóa sản phẩm");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!customerInfo.name) newErrors.name = "Vui lòng nhập họ tên";
    if (!customerInfo.phone) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (!customerInfo.address) newErrors.address = "Vui lòng nhập địa chỉ";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTotal = () => {
    const itemsTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = shippingOptions[selectedShipping].price;
    return (itemsTotal + shippingCost).toFixed(2);
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    try {
      await axios.post("https://domstore.azurewebsites.net/api/v1/orders", {
        items: cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          color: item.color,
          size: item.size
        })),
        customerInfo,
        paymentMethod: selectedPayment,
        shippingMethod: selectedShipping,
        total: calculateTotal()
      }, authConfig);
      toast.success("Đặt hàng thành công!");
      setCartItems([]);
      setCustomerInfo({ name: "", phone: "", address: "", instructions: "" });
    } catch (error) {
      toast.error("Không thể đặt hàng");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Giỏ Hàng</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cartItems.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <p className="text-gray-500">Giỏ hàng của bạn đang trống</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded"
                        onError={(e) => {
                          e.target.src = "images.unsplash.com/photo-1572635196237-14b3f281503f";
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <p className="text-gray-500">Màu sắc: {item.color}</p>
                        <p className="text-gray-500">Kích thước: {item.size}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border rounded">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="p-2 hover:bg-gray-100"
                            aria-label="Giảm số lượng"
                          >
                            <FiMinus />
                          </button>
                          <span className="px-4">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100"
                            aria-label="Tăng số lượng"
                          >
                            <FiPlus />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Xóa sản phẩm"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-xl font-semibold">Tổng Đơn Hàng</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phương Thức Vận Chuyển</label>
                  <select
                    value={selectedShipping}
                    onChange={(e) => setSelectedShipping(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {Object.entries(shippingOptions).map(([key, option]) => (
                      <option key={key} value={key}>
                        {`${key === "standard" ? "Tiêu chuẩn" : key === "express" ? "Nhanh" : "Trong ngày"} - $${option.price} (${option.time})`}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phương Thức Thanh Toán</label>
                  <div className="mt-2 space-y-2">
                    {[
                      { id: "cod", label: "Thanh toán khi nhận hàng" },
                      { id: "momo", label: "Ví MoMo" },
                      { id: "zalo", label: "Zalo Pay" }
                    ].map((method) => (
                      <div key={method.id} className="flex items-center">
                        <input
                          type="radio"
                          id={method.id}
                          name="payment"
                          value={method.id}
                          checked={selectedPayment === method.id}
                          onChange={(e) => setSelectedPayment(e.target.value)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor={method.id} className="ml-2 block text-sm text-gray-700">
                          {method.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Họ và Tên
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md shadow-sm ${errors.name ? "border-red-500" : "border-gray-300"} focus:border-blue-500 focus:ring-blue-500`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Số Điện Thoại
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md shadow-sm ${errors.phone ? "border-red-500" : "border-gray-300"} focus:border-blue-500 focus:ring-blue-500`}
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Địa Chỉ Giao Hàng
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      rows="3"
                      className={`mt-1 block w-full rounded-md shadow-sm ${errors.address ? "border-red-500" : "border-gray-300"} focus:border-blue-500 focus:ring-blue-500`}
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                  </div>

                  <div>
                    <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
                      Ghi Chú Đặc Biệt (Không bắt buộc)
                    </label>
                    <textarea
                      id="instructions"
                      name="instructions"
                      value={customerInfo.instructions}
                      onChange={handleInputChange}
                      rows="2"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Tổng cộng</p>
                    <p>${calculateTotal()}</p>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={cartItems.length === 0}
                  className="w-full bg-blue-600 text-white rounded-md py-3 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Đặt Hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Cart;