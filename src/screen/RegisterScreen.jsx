import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MilkRetailImage from "../assets/Milk-Retail Design.jpg";
import Sneaker from "../assets/snapedit_1728645326495.png";
import { MdOutlineLibraryAddCheck } from "react-icons/md";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const navigate = useNavigate();

  const register = async () => {
    try {
      const response = await fetch(
        "https://domstore.azurewebsites.net/api/v1/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            name,
            address,
            email,
          }),
        },
      );

      if (response.ok) {
        setMessage("Đăng ký thành công!");
        setShowSuccessPopup(true);
      } else {
        setMessage("Đăng ký thất bại.");
      }
    } catch (error) {
      setMessage("Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  useEffect(() => {
    if (showSuccessPopup) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [showSuccessPopup, navigate]);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center">
        <div className="w-full max-w-md px-4">
          <div className="flex items-start justify-start mb-10 mt-5">
            <img src={Sneaker} alt="Logo" className="h-10 mr-2" />
            <h2 className="text-xl text-[#1b2834] font-Questrial font-semibold">
              DomStore
            </h2>
          </div>
          <div className="flex items-center justify-start mb-6">
            <h2 className="text-2xl text-[#1b2834] font-Questrial font-semibold">
              Tạo tài khoản mới
            </h2>
          </div>
          <form>
            <div className="mb-4">
              <label
                className="block text-[#1b2834] text-sm font-bold mb-2 text-left font-Questrial"
                htmlFor="username"
              >
                Tên đăng nhập
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-[#1b2834] leading-tight focus:outline-none focus:shadow-outline font-Questrial focus:border-gray-500"
                id="username"
                type="text"
                placeholder="Tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-[#1b2834] text-sm font-bold mb-2 text-left font-Questrial"
                htmlFor="password"
              >
                Mật khẩu
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-[#1b2834] leading-tight focus:outline-none focus:shadow-outline font-Questrial focus:border-gray-500"
                id="password"
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-[#1b2834] text-sm font-bold mb-2 text-left font-Questrial"
                htmlFor="name"
              >
                Họ và tên
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-[#1b2834] leading-tight focus:outline-none focus:shadow-outline font-Questrial focus:border-gray-500"
                id="name"
                type="text"
                placeholder="Họ và tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-[#1b2834] text-sm font-bold mb-2 text-left font-Questrial"
                htmlFor="address"
              >
                Địa chỉ
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-[#1b2834] leading-tight focus:outline-none focus:shadow-outline font-Questrial focus:border-gray-500"
                id="address"
                type="text"
                placeholder="Địa chỉ"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-[#1b2834] text-sm font-bold mb-2 text-left font-Questrial"
                htmlFor="email"
              >
                Địa chỉ email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-[#1b2834] leading-tight focus:outline-none focus:shadow-outline font-Questrial focus:border-gray-500"
                id="email"
                type="email"
                placeholder="Địa chỉ email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <button
                onClick={register}
                className="w-full bg-gray-800 text-white font-bold py-2 px-4 rounded shadow-lg hover:bg-gray-900 transition duration-300 focus:outline-none focus:shadow-outline font-Questrial"
                type="button"
              >
                ĐĂNG KÝ
              </button>
            </div>
          </form>

          <div
            className="mt-2 text-sm font-Questrial"
            style={{ color: message.startsWith("Lỗi") ? "red" : "green" }}
          >
            {message}
          </div>

          <div className="text-center font-Questrial mt-4 mb-6">
            <p className="text-sm text-gray-500">
              Đã có tài khoản?{" "}
              <a
                href="/login"
                className="text-[#1b2834] hover:text-blue-800 transition duration-300 font-Questrial font-bold"
              >
                Đăng nhập
              </a>
            </p>
          </div>

          <div className="text-center font-Questrial mt-4 mb-6">
            <p className="text-sm text-gray-500">
              <a
                href="#"
                className="text-gray-400 hover:text-[#1b2834] transition duration-300"
              >
                Điều khoản & Điều kiện
              </a>{" "}
              |{" "}
              <a
                href="#"
                className="text-gray-400 hover:text-[#1b2834] transition duration-300"
              >
                Chính sách bảo mật
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 h-full order-last md:order-last">
        <img
          className="h-full w-full object-cover"
          src={MilkRetailImage}
          alt="Side Image"
        />
      </div>

      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl text-center flex flex-col items-center">
            <MdOutlineLibraryAddCheck
              style={{ fontSize: "50px", color: "#4CAF50" }}
            />
            <h2 className="text-2xl font-bold mt-4 text-[#1b2834]">
              Đăng ký thành công!
            </h2>
            <p className="mt-4 text-[#1b2834]">
              Tự động chuyển hướng sau {countdown} giây...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterScreen;
