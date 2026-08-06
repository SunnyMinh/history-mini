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
    <main className=" w-full min-h-screen bg-[url('/img/VN-flag.png')] bg-center bg-no-repeat bg-cover">
      <div className="absolute top-7.5 right-7.5 flex gap-3">
        <button
          className="w-32 border-2 border-white rounded-lg px-5 py-2.5 bg-black/45 text-white text-base font-bold cursor-pointer"
          type="button"
          onClick={handleGoToLogin}
        >
          Đăng nhập
        </button>

        <button
          className="w-32 border-2 border-white rounded-lg px-5 py-2.5 bg-black/45 text-white text-base font-bold cursor-pointer"
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