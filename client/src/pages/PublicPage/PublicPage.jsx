// import "./PublicPage.css";

// function PublicPage({
//   onGoToLogin,
//   onGoToRegister,
// }) {
//   return (
//     <main className="public-page">
//       <div className="public-page__actions">
//         <button
//           type="button"
//           onClick={onGoToLogin}
//         >
//           Đăng nhập
//         </button>

//         <button
//           type="button"
//           onClick={onGoToRegister}
//         >
//           Đăng ký
//         </button>
//       </div>
//     </main>
//   );
// }

// export default PublicPage;

import {
  useNavigate,
} from "@tanstack/react-router";

import "./PublicPage.css";

function PublicPage() {
  const navigate = useNavigate();

  function handleGoToLogin() {
    navigate({
      to: "/login",
    });
  }

  function handleGoToRegister() {
    navigate({
      to: "/register",
    });
  }

  return (
    <main className="public-page">
      <div className="public-page__actions">
        <button
          type="button"
          onClick={handleGoToLogin}
        >
          Đăng nhập
        </button>

        <button
          type="button"
          onClick={handleGoToRegister}
        >
          Đăng ký
        </button>
      </div>
    </main>
  );
}

export default PublicPage;