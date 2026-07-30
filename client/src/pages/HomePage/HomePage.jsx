import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "@tanstack/react-router";

import Lists from "../../components/Menu/Menu";
import Texts from "../../components/Texts/Text";

import {
  getPeriods,
  getEvents,
} from "../../services/historyApi";

import {
  removeStoredAuth,
  getStoredUser,
} from "../../utils/authStorage";

import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  const user = getStoredUser();

  const isAdmin = user?.roles?.includes(
    "Admin"
  );

  const [periods, setPeriods] =
    useState([]);

  const [events, setEvents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadHistoryData() {
      try {
        setLoading(true);
        setError("");

        const [
          periodsData,
          eventsData,
        ] = await Promise.all([
          getPeriods(),
          getEvents(),
        ]);

        console.log(
          "Periods từ API:",
          periodsData
        );

        console.log(
          "Events từ API:",
          eventsData
        );

        setPeriods(
          periodsData.data
        );

        setEvents(
          eventsData.data
        );
      } catch (error) {
        console.error(
          "Lỗi lấy dữ liệu lịch sử:",
          error
        );

        setError(
          error.message ||
            "Không thể lấy dữ liệu lịch sử"
        );
      } finally {
        setLoading(false);
      }
    }

    loadHistoryData();
  }, []);

  function handleLogout() {
    removeStoredAuth();

    navigate({
      to: "/",
      replace: true,
    });
  }

  function handleGoToAdmin() {
    navigate({
      to: "/admin",
    });
  }

  if (loading) {
    return (
      <p>
        Đang tải dữ liệu lịch sử...
      </p>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="home-page">
  <header className="home-topbar">
    <div className="home-topbar__actions">
      {isAdmin && (
        <button
          type="button"
          className="home-topbar__admin-button"
          onClick={handleGoToAdmin}
        >
          Quay lại trang quản trị
        </button>
      )}

      <button
        type="button"
        className="home-topbar__logout-button"
        onClick={handleLogout}
      >
        Đăng xuất
      </button>
    </div>
  </header>

  <section className="hero">
    <h1 className="hero__title">
      Các giai đoạn của Việt Nam
    </h1>
  </section>

      <section className="history-container">
        <aside className="history-sidebar">
          <Lists
            periods={periods}
            events={events}
          />
        </aside>

        <div className="history-content">
          <Texts
            periods={periods}
            events={events}
          />
        </div>
      </section>
    </main>
  );
}

export default HomePage;