import React, { useState, useEffect } from "react";
import MilkRetailImage from "../assets/Milk-Retail Design.jpg";
import Sneaker from "../assets/snapedit_1728645326495.png";
import { MdOutlineLibraryAddCheck } from "react-icons/md";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const login = async () => {
    try {
      const response = await fetch(
        "https://domstore.azurewebsites.net/api/v1/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
          redirect: "follow",
        },
      );

      console.log(response)

      if (response.redirected) {
        // setShowSuccessPopup(true);
        const result = await response.json();
        if (response.ok) {
          setMessage("Đăng nhập thành công!");

        } else {
          setMessage(`Lỗi: ${result.message || "Đăng nhập thất bại"}`);
        }
        setShowPopup(true);
      }
    } catch (error) {
      setMessage("Đăng nhập thất bại. Vui lòng thử lại sau.");
      setShowPopup(true);
    }
  };

  useEffect(() => {
    if (showSuccessPopup && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      window.location.href = "/";
    }
  }, [showSuccessPopup, countdown]);

  const handleFacebookLogin = () => {
    window.location.href =
      "https://domstore.azurewebsites.net/api/v1/auth/facebook";
  };

  const handleGoogleLogin = () => {
    window.location.href =
      "https://domstore.azurewebsites.net/api/v1/auth/google";
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 h-full bg-white flex flex-col justify-center items-center">
        <div className="w-full max-w-md px-4">
          <div className="flex items-start justify-start mb-20 mt-5">
            <img src={Sneaker} alt="Logo" className="h-10 mr-2" />
            <h2 className="text-xl text-[#1b2834] font-Questrial font-semibold">
              DomStore
            </h2>
          </div>
          <div className="flex items-center justify-start mb-6">
            <h2 className="text-2xl text-[#1b2834] font-Questrial font-semibold">
              Đăng nhập tài khoản
            </h2>
          </div>
          <form>
            <div className="mb-4">
              <label
                className="block text-[#1b2834] text-sm font-bold mb-2 text-left font-Questrial"
                htmlFor="email"
              >
                Địa chỉ Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-[#1b2834] leading-tight focus:outline-none focus:shadow-outline font-Questrial focus:border-gray-500"
                id="email"
                type="email"
                placeholder="Email Address"
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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="text-right mt-1">
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-[#1b2834] transition duration-300 font-Questrial font-bold"
                >
                  Quên mật khẩu?
                </a>
              </div>
            </div>

            <div className="mb-6">
              <button
                onClick={login}
                className="w-full bg-gray-800 text-white font-bold py-2 px-4 rounded shadow-lg hover:bg-gray-900 transition duration-300 focus:outline-none focus:shadow-outline font-Questrial"
                type="button"
              >
                ĐĂNG NHẬP
              </button>
            </div>
          </form>

          <div className="text-center font-Questrial">
            <p className="text-sm text-gray-500">
              Bạn chưa có tài khoản?{" "}
              <a
                href="/register"
                className="text-[#1b2834] hover:text-blue-800 transition duration-300 font-Questrial font-bold"
              >
                Đăng ký
              </a>
            </p>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={handleFacebookLogin}
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg mb-5 hover:bg-blue-700 transition duration-300 focus:outline-none focus:shadow-outline font-Questrial"
            >
              Đăng nhập bằng Facebook
            </button>
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded shadow-lg mb-20 hover:bg-red-700 transition duration-300 focus:outline-none focus:shadow-outline font-Questrial"
            >
              Đăng nhập bằng Google
            </button>
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

      <div className="w-full md:w-1/2 h-full">
        <img
          className="h-full w-full object-cover"
          src={MilkRetailImage}
          alt="Side Image"
        />
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-[#1b2834] p-6 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">{message}</h3>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl text-center flex flex-col items-center">
            <MdOutlineLibraryAddCheck
              style={{ fontSize: "50px", color: "#4CAF50" }}
            />
            <h2 className="text-2xl font-bold mt-4 text-[#1b2834]">
              Đăng nhập thành công!
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

export default LoginScreen;
