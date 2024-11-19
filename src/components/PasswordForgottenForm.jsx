import { useState } from "react";
import { toast } from "react-toastify";

const PasswordForgottenForm = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async () => {
        console.log("Button clicked");
        setLoading(true);
        try {
            const response = await fetch("https://domstore.azurewebsites.net/api/v1/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            const result = await response.json();
            console.log(result);
            console.log("Response status:", response.status);
            console.log("Email:", email); // Kiểm tra xem email có được nhập vào hay không

            console.log("Response status text:", response.statusText);

            if (response.ok) {
                toast.success("Email đặt lại mật khẩu đã được gửi!", {
                    autoClose: 3000,
                });
            } else {
                toast.error(`Lỗi: ${result.message || "Không thể gửi email."}`);
            }
        } catch (error) {
            toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-4">
            <div className="mb-2">
                <p className="font-bold">Nhập địa chỉ email của bạn bên dưới.</p>
                <p>Chúng tôi sẽ gửi cho bạn một email để đặt lại mật khẩu.</p>
            </div>
            <div className="flex flex-col">
                <input
                    className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    name="email"
                    placeholder="Địa chỉ email của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    onClick={handleForgotPassword}
                    className="w-full bg-gray-800 text-white font-bold py-2 px-4 rounded shadow-lg hover:bg-gray-900 transition duration-300 focus:outline-none focus:shadow-outline"
                    type="button"
                    disabled={loading}
                >
                    {loading ? "Đang gửi..." : "Gửi email đặt lại mật khẩu"}
                </button>
            </div>
        </div>
    );
};

export default PasswordForgottenForm;
