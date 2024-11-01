import React, { useState, useEffect } from "react";
import { FiTruck, FiPackage, FiCheck, FiX, FiEdit2, FiTrash2, FiClock, FiSearch } from "react-icons/fi";
import axios from "axios";
import { authConfig } from "../utils/axiosConfig";

const AdminOrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [editFormData, setEditFormData] = useState({
        status: "",
        shippingAddress: "",
        shippingCarrier: "",
        trackingNumber: "",
    });

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        const filtered = orders.filter((order) =>
            order._id.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredOrders(filtered);
    }, [searchQuery, orders]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get("https://domstore.azurewebsites.net/api/v1/admin/orders", authConfig);
            const data = response.data
            setOrders(data.data.orders);
            setFilteredOrders(data.data.orders);
        } catch (error) {
            console.error("Lỗi tải đơn hàng:", error);
        }
    };

    const fetchOrderById = async (id) => {
        try {
            const response = await axios.get(
                `https://domstore.azurewebsites.net/api/v1/admin/orders/${id}`,
                authConfig
            );
            const data = response.data
            setSelectedOrder(data.data.order);
            setEditFormData({
                status: data.data.order.status,
                shippingAddress: data.data.order.address,
                // shippingCarrier: data.data.order.shippingCarrier,
                // trackingNumber: data.data.order.trackingNumber,
            });
        } catch (error) {
            console.error("Lỗi tải chi tiết đơn hàng:", error);
        }
    };

    const updateOrder = async (orderId) => {
        try {
            await axios.put(`https://domstore.azurewebsites.net/api/v1/admin/orders/${orderId}`, editFormData, authConfig);
            fetchOrderById(orderId);
            setIsEditing(false);
            fetchOrders();
        } catch (error) {
            console.error("Lỗi cập nhật đơn hàng:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case "processing":
                return <FiClock className="text-yellow-500" />;
            case "shipped":
                return <FiTruck className="text-blue-500" />;
            case "delivered":
                return <FiCheck className="text-green-500" />;
            case "cancelled":
                return <FiX className="text-red-500" />;
            default:
                return <FiPackage className="text-gray-500" />;
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Quản Lý Đơn Hàng</h1>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3">
                    <div className="mb-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm đơn hàng theo ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold mb-4">Danh Sách Đơn Hàng</h2>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        {filteredOrders.map((order) => (
                            <div
                                key={order._id}
                                className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition duration-150 ease-in-out"
                                onClick={() => fetchOrderById(order._id)}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold">Đơn hàng #{order._id}</p>
                                        <p className="text-sm text-gray-600">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        {getStatusIcon(order.status)}
                                        <span className="ml-2 text-sm">
                                            {order.status === "Processing"
                                                ? "Đang xử lý"
                                                : order.status === "Shipped"
                                                ? "Đã gửi"
                                                : order.status === "Delivered"
                                                ? "Đã giao"
                                                : order.status === "Cancelled"
                                                ? "Đã hủy"
                                                : order.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {filteredOrders.length === 0 && (
                            <div className="p-4 text-center text-gray-500">Không tìm thấy đơn hàng</div>
                        )}
                    </div>
                </div>
                <div className="w-full md:w-2/3">
                    <h2 className="text-xl font-semibold mb-4">Chi Tiết Đơn Hàng</h2>
                    {selectedOrder ? (
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Đơn hàng #{selectedOrder._id}</h3>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setIsEditing(!isEditing)}
                                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-150 ease-in-out"
                                    >
                                        <FiEdit2 />
                                    </button>
                                </div>
                            </div>
                            {isEditing ? (
                                <div className="grid grid-cols-1 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                                        <select
                                            name="status"
                                            value={editFormData.status}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full p-2 border rounded"
                                        >
                                            <option value="Processing">Đang xử lý</option>
                                            <option value="Shipped">Đã gửi</option>
                                            <option value="Delivered">Đã giao</option>
                                            <option value="Cancelled">Đã hủy</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Địa chỉ giao hàng
                                        </label>
                                        <input
                                            type="text"
                                            name="shippingAddress"
                                            value={editFormData.shippingAddress}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Đơn vị vận chuyển
                                        </label>
                                        <input
                                            type="text"
                                            name="shippingCarrier"
                                            value={editFormData.shippingCarrier}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Mã vận đơn</label>
                                        <input
                                            type="text"
                                            name="trackingNumber"
                                            value={editFormData.trackingNumber}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full p-2 border rounded"
                                        />
                                    </div>
                                    <button
                                        onClick={() => updateOrder(selectedOrder._id)}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-150 ease-in-out"
                                    >
                                        Cập nhật đơn hàng
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold mb-2">Thông tin đơn hàng</h4>
                                        <p>Ngày: {new Date(selectedOrder.orderDate).toLocaleString()}</p>
                                        <p>
                                            Trạng thái:{" "}
                                            {selectedOrder.status === "Processing"
                                                ? "Đang xử lý"
                                                : selectedOrder.status === "Shipped"
                                                ? "Đã gửi"
                                                : selectedOrder.status === "Delivered"
                                                ? "Đã giao"
                                                : selectedOrder.status === "Cancelled"
                                                ? "Đã hủy"
                                                : selectedOrder.status}
                                        </p>
                                        <p>Tổng tiền: {selectedOrder.totalPrice.toLocaleString()}đ</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2">Thông tin vận chuyển</h4>
                                        <p>Địa chỉ: {selectedOrder.shippingAddress}</p>
                                        <p>Đơn vị vận chuyển: {selectedOrder.shippingCarrier}</p>
                                        <p>Mã vận đơn: {selectedOrder.trackingNumber}</p>
                                    </div>
                                </div>
                            )}
                            <div className="mt-6">
                                <h4 className="font-semibold mb-2">Sản phẩm</h4>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="p-2">Sản phẩm</th>
                                                <th className="p-2">Số lượng</th>
                                                <th className="p-2">Đơn giá</th>
                                                <th className="p-2">Thành tiền</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedOrder && selectedOrder.products.map((item, index) => (
                                                <tr key={index} className="border-b">
                                                    <td className="p-2">{item.productId.productName}</td>
                                                    <td className="p-2">{item.quantity}</td>
                                                    <td className="p-2">{item.productId.price.toLocaleString()}đ</td>
                                                    <td className="p-2">
                                                        {(item.quantity * item.productId.price).toLocaleString()}đ
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="mt-6">
                                <h4 className="font-semibold mb-2">Lịch sử đơn hàng</h4>
                                <div className="space-y-4">
                                    {selectedOrder.statusUpdates.map((update, index) => (
                                        <div key={index} className="flex items-center">
                                            {getStatusIcon(update.status)}
                                            <div className="ml-4">
                                                <p className="font-semibold">
                                                    {update.status === "Processing"
                                                        ? "Đang xử lý"
                                                        : update.status === "Shipped"
                                                        ? "Đã gửi"
                                                        : update.status === "Delivered"
                                                        ? "Đã giao"
                                                        : update.status === "Cancelled"
                                                        ? "Đã hủy"
                                                        : update.status}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {new Date(update.date).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white shadow-md rounded-lg p-6 text-center text-gray-500">
                            Chọn một đơn hàng để xem chi tiết
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminOrderManagement;
