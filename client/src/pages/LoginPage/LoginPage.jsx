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
    <main className="min-h-screen flex items-center justify-center p-6 bg-[#f4f4f4]">
      <button
        type="button"
        className="fixed top-5 right-6 z-100 px-5 py-2.5 text-[16px] font-bold bg-white text-[#333333] border border-solid border-[#333333] rounded-md cursor-pointer hover:bg-[#eeeeee]"
        onClick={handleGoToRegister}
      >
        Đăng ký
      </button>

      <button
        type="button"
        className="fixed top-5 left-6 z-100 px-5 py-2.5 text-[16px] font-bold bg-white text-[#333333] border border-solid border-[#333333] rounded-md cursor-pointer hover:bg-[#eeeeee]"
        onClick={handleGoToPublic}
      >
        Quay lại
      </button>

      <form
        className="w-full max-w-100 p-8 bg-white rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
        onSubmit={handleSubmit}
      >
        <h1 className="mt-0 mb-6 text-center">Đăng nhập</h1>

        <div className="flex flex-col gap-2 mb-[18px]">
          <label className="font-semibold" htmlFor="username">
            Tên đăng nhập
          </label>

          <input
            className="p-3 text-[16px] border border-solid border-[#cccccc] rounded-md focus:outline-2 focus:outline-solid focus:outline-[#333333] focus:outline-offset-1"
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

        <div className="flex flex-col gap-2 mb-[18px]">
          <label className="font-semibold" htmlFor="password">
            Mật khẩu
          </label>

          <input
            className="p-3 text-[16px] border border-solid border-[#cccccc] rounded-md focus:outline-2 focus:outline-solid focus:outline-[#333333] focus:outline-offset-1"
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
          <p className="mb-4 text-[#c62828] text-center">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 text-[16px] font-semibold cursor-pointer text-white hover:bg-gray-600 bg-gray-800  disabled:cursor-not-allowed disabled:opacity-60"
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