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
    <main className="register-page">
      <form
        className="register-form"
        onSubmit={handleSubmit}
      >
        <h1>Đăng ký tài khoản</h1>

        <div className="register-field">
          <label htmlFor="register-username">
            Tên đăng nhập
          </label>

          <input
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

        <div className="register-field">
          <label htmlFor="register-email">
            Email
          </label>

          <input
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

        <div className="register-field">
          <label htmlFor="register-password">
            Mật khẩu
          </label>

          <input
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

        <div className="register-field">
          <label htmlFor="confirm-password">
            Xác nhận mật khẩu
          </label>

          <input
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
          <p className="register-error">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Đang đăng ký..."
            : "Đăng ký"}
        </button>

        <button
          type="button"
          onClick={handleGoToLogin}
        >
          Quay lại đăng nhập
        </button>

        <button
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