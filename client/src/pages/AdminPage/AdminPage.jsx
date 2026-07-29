import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "@tanstack/react-router";

import {
  getPeriods,
  getEvents,
} from "../../services/historyApi";

import {
  getStoredUser,
  removeStoredAuth,
} from "../../utils/authStorage";

import PeriodList from
  "../../components/PeriodList/PeriodList.jsx";

import PeriodEditForm from
  "../../components/PeriodEditForm/PeriodEditForm";

import "./AdminPage.css";

function AdminPage() {
  const navigate = useNavigate();

  const user = getStoredUser();

  const [periods, setPeriods] =
    useState([]);

  const [events, setEvents] =
    useState([]);

  const [
    expandedPeriodId,
    setExpandedPeriodId,
  ] = useState(null);

  const [
    editingPeriod,
    setEditingPeriod,
] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadAdminData() {
      try {
        setLoading(true);
        setError("");

        const [
          periodsResponse,
          eventsResponse,
        ] = await Promise.all([
          getPeriods(),
          getEvents(),
        ]);

        setPeriods(
          periodsResponse.data || []
        );

        setEvents(
          eventsResponse.data || []
        );
      } catch (error) {
        console.error(
          "Load admin data error:",
          error
        );

        setError(
          error.message ||
            "Không thể tải dữ liệu"
        );
      } finally {
        setLoading(false);
      }
    }

    loadAdminData();
  }, []);

  function handleTogglePeriod(periodId) {
    setExpandedPeriodId(
      expandedPeriodId === periodId
        ? null
        : periodId
    );
  }

  function handleGoToHome() {
    navigate({
      to: "/home",
    });
  }

  function handleLogout() {
    removeStoredAuth();

    navigate({
      to: "/",
      replace: true,
    });
  }

  function handleAddPeriod() {
    console.log("Thêm thời kỳ");
  }

  function handleEditPeriod(period) {
    setEditingPeriod(period);
  }

  function handleClosePeriodEdit() {
    setEditingPeriod(null);
  }

  function handleDeletePeriod(period) {
    console.log(
      "Xóa thời kỳ:",
      period
    );
  }

  function handleAddEvent(period) {
    console.log(
      "Thêm sự kiện cho thời kỳ:",
      period
    );
  }

  function handleEditEvent(
    historyEvent
  ) {
    console.log(
      "Sửa sự kiện:",
      historyEvent
    );
  }

  function handleDeleteEvent(
    historyEvent
  ) {
    console.log(
      "Xóa sự kiện:",
      historyEvent
    );
  }

  if (loading) {
    return (
      <main className="admin-page">
        <p className="admin-page__state">
          Đang tải dữ liệu...
        </p>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p className="admin-header__label">
            HISTORY WIKI
          </p>

          <h1 className="admin-header__title">
            Trang quản trị
          </h1>

          <p className="admin-header__user">
            Xin chào,{" "}
            <strong>
              {user?.username || "Admin"}
            </strong>
          </p>
        </div>

        <div className="admin-header__actions">
          <button
            type="button"
            className="admin-header__home-button"
            onClick={handleGoToHome}
          >
            Xem trang lịch sử
          </button>

          <button
            type="button"
            className="admin-header__logout-button"
            onClick={handleLogout}
          >
            Đăng xuất
          </button>
        </div>
      </header>

      <div className="admin-content">
        {error && (
          <p className="admin-page__error">
            {error}
          </p>
        )}

        <section className="admin-summary">
          <article className="summary-card">
            <p>Tổng số thời kỳ</p>

            <strong>
              {periods.length}
            </strong>
          </article>

          <article className="summary-card">
            <p>Tổng số sự kiện</p>

            <strong>
              {events.length}
            </strong>
          </article>
        </section>

        <PeriodList
          periods={periods}
          events={events}
          expandedPeriodId={
            expandedPeriodId
          }
          onTogglePeriod={
            handleTogglePeriod
          }
          onAddPeriod={
            handleAddPeriod
          }
          onEditPeriod={
            handleEditPeriod
          }
          onDeletePeriod={
            handleDeletePeriod
          }
          onAddEvent={
            handleAddEvent
          }
          onEditEvent={
            handleEditEvent
          }
          onDeleteEvent={
            handleDeleteEvent
          }
        />
      </div>
    </main>
  );
}

export default AdminPage;