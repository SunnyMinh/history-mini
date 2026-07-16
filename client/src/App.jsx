import { useState } from "react";

import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return Boolean(localStorage.getItem("token"));
  });

  const [authPage, setAuthPage] = useState("login");

  function handleLoginSuccess() {
    setIsLoggedIn(true);
  }

  function showRegisterPage() {
    setAuthPage("register");
  }

  function showLoginPage() {
    setAuthPage("login");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setAuthPage("login");
  }

  if (isLoggedIn) {
    return (
      <>
        <button
          type="button"
          className="logout-button"
          onClick={handleLogout}
        >
          Đăng xuất
        </button>

        <HomePage />
      </>
    );
  }

  if (authPage === "register") {
  return (
    <RegisterPage
      onRegisterSuccess={handleLoginSuccess}
      onGoToLogin={showLoginPage}
    />
  );
}

  return (
    <LoginPage
      onLoginSuccess={handleLoginSuccess}
      onGoToRegister={showRegisterPage}
    />
  );
}

export default App;