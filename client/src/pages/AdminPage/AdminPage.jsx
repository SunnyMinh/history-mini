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
  createPeriod,
  updatePeriod,
  deletePeriod,
  deleteEvent,
} from "../../services/historyApi";

import {
  getStoredUser,
  removeStoredAuth,
} from "../../utils/authStorage";

import PeriodList from
  "../../components/PeriodList/PeriodList.jsx";

import PeriodEditForm from
  "../../components/PeriodEditForm/PeriodEditForm";

import PeriodCreateForm from
  "../../components/PeriodCreateForm/PeriodCreateForm";

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
  isCreatingPeriod,
  setIsCreatingPeriod,
  ] = useState(false);

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

  function handleTogglePeriod(
    periodId
  ) {
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
    setIsCreatingPeriod(true);
  }

  function handleClosePeriodCreate() {
  setIsCreatingPeriod(false);
  }

  function handleEditPeriod(period) {
    setEditingPeriod(period);
  }

  function handleClosePeriodEdit() {
    setEditingPeriod(null);
  }

  async function handleCreatePeriod(
  periodData
) {
  try {
    setError("");

    const response =
      await createPeriod(
        periodData
      );

    const createdPeriod =
      response.data;

    setPeriods((currentPeriods) => [
      ...currentPeriods,
      createdPeriod,
    ]);

    // Tạo thành công thì đóng modal
    setIsCreatingPeriod(false);
  } catch (error) {
    console.error(
      "Create period error:",
      error
    );

    const errorMessage =
      error.message ||
      "Không thể thêm thời kỳ";

    setError(errorMessage);

    window.alert(errorMessage);
  }
}

  async function handleSavePeriod(
    periodData
  ) {
    // if (!editingPeriod) {
    //   return;
    // }

    try {
      setError("");

      const response =
        await updatePeriod(
          editingPeriod.id,
          periodData
        );

      const updatedPeriod =
        response.data;

      setPeriods((currentPeriods) =>
        currentPeriods.map((period) =>
          String(period.id) ===
          String(updatedPeriod.id)
            ? {
                ...period,
                ...updatedPeriod,
              }
            : period
        )
      );

      setEditingPeriod(null);
    } catch (error) {
      console.error(
        "Update period error:",
        error
      );

      setError(
        error.message ||
          "Không thể cập nhật thời kỳ"
      );
    }
  }

  async function handleDeletePeriod(
  period
) {
  const confirmed =
    window.confirm(
      `Bạn có chắc muốn xóa thời kỳ "${period.period_name}" không?\n\nToàn bộ sự kiện thuộc thời kỳ này cũng sẽ bị xóa và không thể khôi phục.`
    );

  if (!confirmed) {
    return;
  }

  try {
    setError("");

    await deletePeriod(period.id);

    setPeriods((currentPeriods) =>
      currentPeriods.filter(
        (currentPeriod) =>
          String(currentPeriod.id) !==
          String(period.id)
      )
    );

    setEvents((currentEvents) =>
      currentEvents.filter(
        (historyEvent) => {
          const eventPeriodId =
            historyEvent.period_id ??
            historyEvent.period?.id;

          return (
            String(eventPeriodId) !==
            String(period.id)
          );
        }
      )
    );

    if (
      String(expandedPeriodId) ===
      String(period.id)
    ) {
      setExpandedPeriodId(null);
    }

    window.alert(
      "Đã xóa thời kỳ và toàn bộ sự kiện thuộc thời kỳ"
    );
  } catch (error) {
    console.error(
      "Delete period error:",
      error
    );

    setError(
      error.message ||
        "Không thể xóa thời kỳ"
    );
  }
}

  function handleAddEvent(period) {
    navigate({
      to: "/admin/events/new",

      search: {
      periodId: period.id,
      },
    });
  }

  function handleEditEvent(
    historyEvent
  ) {
    navigate({
      to: `/admin/events/$eventId/edit`,

      params: {
        eventId: String(
          historyEvent.id
        ),
      },
    });
  }

  async function handleDeleteEvent(
  historyEvent
) {
  const confirmed =
    window.confirm(
      `Bạn có chắc muốn xóa sự kiện "${historyEvent.event_name}" không?\n\nDữ liệu đã xóa sẽ không thể khôi phục.`
    );

  if (!confirmed) {
    return;
  }

  try {
    setError("");

    await deleteEvent(
      historyEvent.id
    );

    setEvents((currentEvents) =>
      currentEvents.filter(
        (currentEvent) =>
          String(currentEvent.id) !==
          String(historyEvent.id)
      )
    );

    window.alert(
      "Xóa sự kiện thành công"
    );
  } catch (error) {
    console.error(
      "Delete event error:",
      error
    );

    const errorMessage =
      error.message ||
      "Không thể xóa sự kiện";

    setError(errorMessage);

    window.alert(errorMessage);
  }
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
      
      {isCreatingPeriod && (
        <PeriodCreateForm
          onSave={handleCreatePeriod}
          onClose={handleClosePeriodCreate}
        />
      )}

      {editingPeriod && (
        <PeriodEditForm
          period={editingPeriod}
          onSave={handleSavePeriod}
          onClose={
            handleClosePeriodEdit
          }
        />
      )}
    </main>
  );
}

export default AdminPage;