import { useState } from "react";

import {
  useNavigate,
} from "@tanstack/react-router";

import {
  registerUser,
  loginUser,
} from "../../services/authApi";

import {
  saveStoredAuth,
} from "../../utils/authStorage";

import "./RegisterPage.css";

function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [usermail, setUsermail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    const cleanUsername =
      username.trim();

    const cleanUsermail =
      usermail.trim();

    if (
      !cleanUsername ||
      !cleanUsermail ||
      !password ||
      !confirmPassword
    ) {
      setError(
        "Vui lòng nhập đầy đủ thông tin"
      );

      return;
    }

    if (password.length < 6) {
      setError(
        "Mật khẩu phải có ít nhất 6 ký tự"
      );

      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Mật khẩu xác nhận không khớp"
      );

      return;
    }

    try {
      setLoading(true);

      // 1. Tạo tài khoản mới
      await registerUser(
        cleanUsername,
        cleanUsermail,
        password
      );

      // 2. Tự động đăng nhập
      const loginResult =
        await loginUser(
          cleanUsername,
          password
        );

      const token =
        loginResult.data.token;

      const user =
        loginResult.data.user;

      // 3. Lưu token và user
      saveStoredAuth({
        token,
        user,
      });

      // 4. Tài khoản mới mặc định là Viewer
      navigate({
        to: "/home",
        replace: true,
      });
    } catch (error) {
      setError(
        error.message ||
          "Đăng ký tài khoản thất bại"
      );
    } finally {
      setLoading(false);
    }
  }

  function handleGoToLogin() {
    navigate({
      to: "/login",
    });
  }

  function handleGoToPublic() {
    navigate({
      to: "/",
    });
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-[#f4f4f4]">
      <form
        className="w-full max-w-105 p-8 bg-white rounded-[10px] shadow-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Đăng ký tài khoản
        </h1>

        <div className="flex flex-col mb-4.5 gap-2">
          <label 
            htmlFor="register-username"
            className="font-semibold"
          >
            Tên đăng nhập
          </label>

          <input
            className="w-full p-3 text-base border border-[#cccccc] rounded-md focus:outline-2 focus:outline-[#000000]"
            id="register-username"
            type="text"
            value={username}
            onChange={(event) =>
              setUsername(
                event.target.value
              )
            }
            placeholder="Nhập username"
            autoComplete="username"
          />
        </div>

        <div className="flex flex-col mb-4.5 gap-2">
          <label className="font-semibold" htmlFor="register-email">
            Email
          </label>

          <input
            className="w-full p-3 text-base border border-[#cccccc] rounded-md focus:outline-2 focus:outline-[#000000]"
            id="register-email"
            type="email"
            value={usermail}
            onChange={(event) =>
              setUsermail(
                event.target.value
              )
            }
            placeholder="Nhập email"
            autoComplete="email"
          />
        </div>

        <div className="flex flex-col mb-4.5 gap-2">
          <label className="font-semibold" htmlFor="register-password">
            Mật khẩu
          </label>

          <input
            className="w-full p-3 text-base border border-[#cccccc] rounded-md focus:outline-2 focus:outline-[#000000]"
            id="register-password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(
                event.target.value
              )
            }
            placeholder="Ít nhất 6 ký tự"
            autoComplete="new-password"
          />
        </div>

        <div className="flex flex-col mb-4.5 gap-2">
          <label className="font-semibold"  htmlFor="confirm-password">
            Xác nhận mật khẩu
          </label>

          <input
            className="w-full p-3 text-base border border-[#cccccc] rounded-md focus:outline-2 focus:outline-[#000000]"
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(
                event.target.value
              )
            }
            placeholder="Nhập lại mật khẩu"
            autoComplete="new-password"
          />
        </div>

        {error && (
          <p className="text-red-700 mb-4 text-center">
            {error}
          </p>
        )}

        <button
          className="w-full p-3 text-base font-semibold cursor-pointer bg-gray-800 text-white hover:bg-gray-600 mb-1 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Đang đăng ký..."
            : "Đăng ký"}
        </button>

        <button
          className="w-full p-3 text-base font-semibold cursor-pointer bg-gray-800 text-white hover:bg-gray-600 mb-1 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          type="button"
          onClick={handleGoToLogin}
        >
          Quay lại đăng nhập
        </button>

        <button
          className="w-full p-3 text-base font-semibold cursor-pointer bg-gray-800 text-white hover:bg-gray-600 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          type="button"
          onClick={handleGoToPublic}
        >
          Quay lại trang giới thiệu
        </button>
      </form>
    </main>
  );
}

export default RegisterPage;