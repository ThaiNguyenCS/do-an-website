import React, { useState, useEffect } from "react";
import { FaShoppingCart, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import axios from "axios";
import { useParams } from "react-router-dom";
const apiURL = import.meta.env.VITE_API_URL;

const ProductDetail = (props) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [availableSizes, setAvailableSizes] = useState([]);
    const params = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${apiURL}/products/${params.productId}`);
                if (response.data.status === "success") {
                    setProduct(response.data.data);
                    if (response.data.data.colorSummary.length > 0) {
                        setSelectedColor(response.data.data.colorSummary[0].color);
                        setAvailableSizes(response.data.data.colorSummary[0].sizes.map((s) => s.size));
                    }
                } else {
                    throw new Error("Failed to fetch product data");
                }
            } catch (err) {
                setError("Error fetching product data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, []);

    const handleImageChange = (direction) => {
        if (product) {
            if (direction === "next") {
                setCurrentImage((prev) => (prev + 1) % product.imageUrl.length);
            } else {
                setCurrentImage((prev) => (prev - 1 + product.imageUrl.length) % product.imageUrl.length);
            }
        }
    };

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            alert("Please select both size and color before adding to cart.");
            return;
        }
        alert(`Added to cart: ${product.name} - Size: ${selectedSize}, Color: ${selectedColor}`);
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="text-yellow-400" />);
            } else if (i - 0.5 <= rating) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
            } else {
                stars.push(<FaStar key={i} className="text-gray-300" />);
            }
        }
        return stars;
    };

    const handleColorChange = (color) => {
        setSelectedColor(color);
        setSelectedSize("");
        const selectedColorObj = product.colorSummary.find((c) => c.color === color);
        if (selectedColorObj) {
            setAvailableSizes(selectedColorObj.sizes.map((s) => s.size));
        }
    };

    if (loading) return <div className="text-center py-8">Loading...</div>;
    if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
    if (!product) return <div className="text-center py-8">No product data available</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Product Images Section */}
                <div className="md:w-1/2">
                    <div className="relative overflow-hidden rounded-lg mb-4">
                        <img
                            src={product.imageUrl[currentImage]}
                            alt={`${product.name} - View ${currentImage + 1}`}
                            className="w-full h-auto object-cover transition-transform duration-300 transform hover:scale-110"
                        />
                        <button
                            onClick={() => handleImageChange("prev")}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
                            aria-label="Previous image"
                        >
                            <BsChevronLeft />
                        </button>
                        <button
                            onClick={() => handleImageChange("next")}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full"
                            aria-label="Next image"
                        >
                            <BsChevronRight />
                        </button>
                    </div>
                    <div className="flex justify-center space-x-2">
                        {product.imageUrl.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImage(index)}
                                className={`w-16 h-16 rounded-md overflow-hidden ${
                                    index === currentImage ? "ring-2 ring-blue-500" : ""
                                }`}
                            >
                                <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Details Section */}
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                    <p className="text-gray-600 mb-4">{product.description}</p>

                    <div className="mb-4">
                        <span className="text-2xl font-bold text-green-600">
                            {product.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                        </span>
                        {product.promotionalPrice && (
                            <span className="ml-2 text-lg text-gray-500 line-through">
                                {product.promotionalPrice.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </span>
                        )}
                    </div>

                    <div className="mb-4">
                        <h2 className="text-lg font-semibold mb-2">Màu sắc</h2>
                        <div className="flex flex-wrap gap-2">
                            {product.colorSummary.map((colorObj) => (
                                <button
                                    key={colorObj.color}
                                    onClick={() => handleColorChange(colorObj.color)}
                                    className={`w-8 h-8 rounded-full border-2 ${
                                        selectedColor === colorObj.color ? "border-blue-500" : "border-gray-300"
                                    }`}
                                    style={{ backgroundColor: colorObj.color.toLowerCase() }}
                                    aria-label={`Select ${colorObj.color} color`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-lg font-semibold mb-2">Size</h2>
                        <div className="flex flex-wrap gap-2">
                            {availableSizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-2 border rounded ${
                                        selectedSize === size ? "bg-blue-500 text-white" : "bg-gray-100"
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                    >
                        <FaShoppingCart className="mr-2" /> Thêm vào giỏ hàng
                    </button>

                    <div className="mt-4">
                        <p>
                            <strong>Danh mục:</strong> {product.category.name}
                        </p>
                        <p>
                            <strong>Tổng số lượng:</strong> {product.totalQuantity}
                        </p>
                        <p>
                            <strong>Tổng số màu sắc:</strong> {product.totalColors}
                        </p>
                        <p>
                            <strong>Tổng số kích thước:</strong> {product.totalSizes}
                        </p>
                    </div>
                </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Đánh Giá Sản Phẩm</h2>
                <div className="flex items-center mb-4">
                    <div className="flex mr-2">{renderStars(product.totalRate)}</div>
                    <span className="text-lg font-semibold">{product.totalRate.toFixed(1)} out of 5</span>
                </div>

                {product.reviews.length > 0 ? (
                    <div className="space-y-4">
                        {product.reviews.map((review, index) => (
                            <div key={index} className="border p-4 rounded-lg">
                                <div className="flex items-center mb-2">
                                    <div className="flex mr-2">{renderStars(review.rating)}</div>
                                    <span className="font-semibold">{review.user}</span>
                                </div>
                                <p className="text-gray-700">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Chưa có đánh giá</p>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
