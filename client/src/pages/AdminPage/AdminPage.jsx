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
      <main className="min-h-screen text-[#1f2937] bg-[#f4f6f8]">
        <p className="grid place-items-center min-h-screen m-0">
          Đang tải dữ liệu...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen text-[#1f2937] bg-[#f4f6f8]">
      <header className="flex items-center justify-between gap-6 px-10 py-6 text-white bg-[#1f2937]">
        <div>
          <p className="mb-1 text-[0.75rem] font-bold tracking-[2px]">
            HISTORY WIKI
          </p>

          <h1 className="text-[1.8rem]">
            Trang quản trị
          </h1>

          <p className="mt-2 text-[#d1d5db]">
            Xin chào,{" "}
            <strong>
              {user?.username || "Admin"}
            </strong>
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-md border-0 px-4 py-2.5 [font:inherit] cursor-pointer text-[#1f2937] bg-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#e5e7eb] hover:box:shadow-[0_5px_12px_rgba(0,0,0,0.2)] active:translate-y-1 active:shadow-none"
            onClick={handleGoToHome}
          >
            Xem trang lịch sử
          </button>

          <button
            type="button"
            className="rounded-md border-0 px-4 py-2.5 [font:inherit] cursor-pointer text-white bg-[#dc2626]  [transition:background-color_0.2s_ease,color_0.2s_ease,transform_0.2s_ease,box-shadow_0.2s_ease] hover:-translate-y-0.5 hover:box:shadow-[0_5px_12px_rgba(0,0,0,0.2)] active:translate-y-1 active:shadow-none"
            onClick={handleLogout}
          >
            Đăng xuất
          </button>
        </div>
      </header>

      <div className="grid gap-6  w-[calc(100%-40px)] max-w-[1200px] mx-auto pt-8 pb-12">
        {error && (
          <p className="m-0 px-4 py-3.5 text-[#991b1b] bg-[#fee2e2] border border-solid border-[#fecaca] rounded-lg">
            {error}
          </p>
        )}

        <section className="grid grid-cols-2 gap-5">
          <article className="p-6 bg-white border border-solid border-[#e5e7eb] rounded-[10px]">
            <p className="mb-2.5 text-[#6b7280]">Tổng số thời kỳ</p>

            <strong className="text-[2rem]">
              {periods.length}
            </strong>
          </article>

          <article className="p-6 bg-white border border-solid border-[#e5e7eb] rounded-[10px]">
            <p className="mb-2.5 text-[#6b7280]">Tổng số sự kiện</p>

            <strong className="text-[2rem]">
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