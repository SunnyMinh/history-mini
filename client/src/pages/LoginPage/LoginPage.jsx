// import { useState } from "react";
// import { loginUser } from "../../services/authApi";
// import "./LoginPage.css";

// function LoginPage({
//   onLoginSuccess,
//   onGoToRegister,
//   onGoToPublic,
// }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(event) {
//     event.preventDefault();

//     setError("");

//     if (!username.trim() || !password.trim()) {
//       setError("Vui lòng nhập username và password");
//       return;
//     }

//     try {
//       setLoading(true);

//       const result = await loginUser(
//         username.trim(),
//         password
//       );

//       const token = result.data.token;
//       const user = result.data.user;

//       localStorage.setItem("token", token);
//       localStorage.setItem(
//         "user",
//         JSON.stringify(user)
//       );

//       console.log("Đăng nhập thành công:", result);
//       console.log("Token:", token);
//       console.log("User:", user);

//       onLoginSuccess();
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <main className="login-page">
//       <button
//       type="button"
//       className="go-register-button"
//       onClick={onGoToRegister}
//       >
//       Đăng ký
//       </button>

//        <button
//       type="button"
//       className="go-public-button"
//       onClick={onGoToPublic}
//     >
//       Quay lại
//     </button>
    
//       <form
//         className="login-form"
//         onSubmit={handleSubmit}
//       >
//         <h1>Đăng nhập</h1>

//         <div className="login-field">
//           <label htmlFor="username">
//             Tên đăng nhập
//           </label>

//           <input
//             id="username"
//             type="text"
//             value={username}
//             onChange={(event) =>
//               setUsername(event.target.value)
//             }
//             placeholder="Nhập username"
//             autoComplete="username"
//           />
//         </div>

//         <div className="login-field">
//           <label htmlFor="password">
//             Mật khẩu
//           </label>

//           <input
//             id="password"
//             type="password"
//             value={password}
//             onChange={(event) =>
//               setPassword(event.target.value)
//             }
//             placeholder="Nhập password"
//             autoComplete="current-password"
//           />
//         </div>

//         {error && (
//           <p className="login-error">
//             {error}
//           </p>
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//         >
//           {loading
//             ? "Đang đăng nhập..."
//             : "Đăng nhập"}
//         </button>
//       </form>
//     </main>
//   );
// }

// export default LoginPage;

import { useState } from "react";

import {
  useNavigate,
} from "@tanstack/react-router";

import {
  loginUser,
} from "../../services/authApi";

import {
  saveStoredAuth,
} from "../../utils/authStorage";

import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    const cleanUsername =
      username.trim();

    if (
      !cleanUsername ||
      !password.trim()
    ) {
      setError(
        "Vui lòng nhập username và password"
      );

      return;
    }

    try {
      setLoading(true);

      const result = await loginUser(
        cleanUsername,
        password
      );

      const token =
        result.data.token;

      const user =
        result.data.user;

      saveStoredAuth({
        token,
        user,
      });

      console.log(
        "Đăng nhập thành công:",
        result
      );

      console.log("User:", user);

      const isAdmin =
        user.roles?.includes("Admin") ??
        false;

      navigate({
        to: isAdmin
          ? "/admin"
          : "/home",

        replace: true,
      });
    } catch (error) {
      setError(
        error.message ||
          "Đăng nhập thất bại"
      );
    } finally {
      setLoading(false);
    }
  }

  function handleGoToRegister() {
    navigate({
      to: "/register",
    });
  }

  function handleGoToPublic() {
    navigate({
      to: "/",
    });
  }

  return (
    <main className="login-page">
      <button
        type="button"
        className="go-register-button"
        onClick={handleGoToRegister}
      >
        Đăng ký
      </button>

      <button
        type="button"
        className="go-public-button"
        onClick={handleGoToPublic}
      >
        Quay lại
      </button>

      <form
        className="login-form"
        onSubmit={handleSubmit}
      >
        <h1>Đăng nhập</h1>

        <div className="login-field">
          <label htmlFor="username">
            Tên đăng nhập
          </label>

          <input
            id="username"
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

        <div className="login-field">
          <label htmlFor="password">
            Mật khẩu
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(
                event.target.value
              )
            }
            placeholder="Nhập password"
            autoComplete="current-password"
          />
        </div>

        {error && (
          <p className="login-error">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Đang đăng nhập..."
            : "Đăng nhập"}
        </button>
      </form>
    </main>
  );
}

export default LoginPage;