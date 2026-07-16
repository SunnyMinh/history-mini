import { useState } from "react";
import {
  registerUser,
  loginUser,
} from "../../services/authApi";
import "./RegisterPage.css";

function RegisterPage({ onRegisterSuccess, onGoToLogin }) {
  const [username, setUsername] = useState("");
  const [usermail, setUsermail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] =
    useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccessMessage("");

    if (
      !username.trim() ||
      !usermail.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (password.length < 6) {
      setError(
        "Mật khẩu phải có ít nhất 6 ký tự"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
  setLoading(true);

  // 1. Tạo tài khoản Viewer
  await registerUser(
    username.trim(),
    usermail.trim(),
    password
  );

  // 2. Tự đăng nhập bằng tài khoản vừa tạo
  const loginResult = await loginUser(
    username.trim(),
    password
  );

  const token = loginResult.data.token;
  const user = loginResult.data.user;

  // 3. Lưu token và thông tin user
  localStorage.setItem("token", token);

  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );

  // 4. Chuyển vào HomePage
  onRegisterSuccess();
} catch (error) {
  setError(error.message);
} finally {
  setLoading(false);
}
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
              setUsername(event.target.value)
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
              setUsermail(event.target.value)
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
              setPassword(event.target.value)
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
              setConfirmPassword(event.target.value)
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

        {successMessage && (
          <p className="register-success">
            {successMessage}
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
            onClick={onGoToLogin}
>
        Quay lại đăng nhập
    </button>
      </form>
    </main>
  );
}

export default RegisterPage;