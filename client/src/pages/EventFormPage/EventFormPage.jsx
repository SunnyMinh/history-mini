import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "@tanstack/react-router";

import {
  createEvent,
  getEventById,
  getPeriodById,
  updateEvent,
} from "../../services/historyApi";

import "./EventFormPage.css";

function EventFormPage({
  mode,
  periodId,
  eventId,
}) {
  const navigate = useNavigate();

  const [eventName, setEventName] =
    useState("");

  const [timeLabel, setTimeLabel] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [imageUrl, setImageUrl] =
    useState("");

  const [
    currentPeriodId,
    setCurrentPeriodId,
  ] = useState(periodId || null);

  const [
    periodName,
    setPeriodName,
  ] = useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const isEditMode =
    mode === "edit";

  useEffect(() => {
    async function loadFormData() {
      try {
        setLoading(true);
        setError("");

        if (isEditMode) {
          const response =
            await getEventById(
              eventId
            );

          const historyEvent =
            response.data;

          setEventName(
            historyEvent.event_name ||
              ""
          );

          setTimeLabel(
            historyEvent.time_label ||
              ""
          );

          setDescription(
            historyEvent.description ||
              ""
          );

          setImageUrl(
            historyEvent.image_url ||
              ""
          );

          const foundPeriodId =
            historyEvent.period_id ??
            historyEvent.period?.id;

          setCurrentPeriodId(
            foundPeriodId
          );

          setPeriodName(
            historyEvent.period
              ?.period_name || ""
          );
        } else {
          if (!periodId) {
            throw new Error(
              "Không xác định được thời kỳ"
            );
          }

          const response =
            await getPeriodById(
              periodId
            );

          setPeriodName(
            response.data
              ?.period_name || ""
          );

          setCurrentPeriodId(
            periodId
          );
        }
      } catch (error) {
        console.error(
          "Load event form error:",
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

    loadFormData();
  }, [
    isEditMode,
    eventId,
    periodId,
  ]);

  function handleBack() {
    navigate({
      to: "/admin",
    });
  }

  async function handleSubmit(
    submitEvent
  ) {
    submitEvent.preventDefault();

    setError("");

    const cleanEventName =
      eventName.trim();

    const cleanTimeLabel =
      timeLabel.trim();

    const cleanDescription =
      description.trim();

    const cleanImageUrl =
      imageUrl.trim();

    if (!cleanEventName) {
      setError(
        "Vui lòng nhập tên sự kiện"
      );

      return;
    }

    try {
      const eventData = {
        event_name:
          cleanEventName,

        time_label:
          cleanTimeLabel,

        description:
          cleanDescription,

        image_url:
          cleanImageUrl,
      };

      if (isEditMode) {
        await updateEvent(
          eventId,
          eventData
        );
      } else {
        await createEvent({
          period_id:
            currentPeriodId,

          ...eventData,
        });
      }

      navigate({
        to: "/admin",
        replace: true,
      });
    } catch (error) {
      console.error(
        "Save event error:",
        error
      );

      setError(
        error.message ||
          "Không thể lưu sự kiện"
      );
    }
  }

  if (loading) {
    return (
      <main className="event-form-page">
        <p className="event-form-page__state">
          Đang tải dữ liệu...
        </p>
      </main>
    );
  }

  return (
    <main className="event-form-page">
      <header className="event-form-header">
        <div>
          <p className="event-form-header__label">
            HISTORY WIKI
          </p>

          <h1>
            {isEditMode
              ? "Chỉnh sửa sự kiện"
              : "Thêm sự kiện"}
          </h1>

          {periodName && (
            <p className="event-form-header__period">
              Thuộc thời kỳ:{" "}
              <strong>
                {periodName}
              </strong>
            </p>
          )}
        </div>

        <button
          type="button"
          className="event-form-header__back-button"
          onClick={handleBack}
        >
          Quay lại
        </button>
      </header>

      <section className="event-form-container">
        {error && (
          <p className="event-form-page__error">
            {error}
          </p>
        )}

        <form
          className="event-form"
          onSubmit={handleSubmit}
        >
          <div className="event-form__field">
            <label htmlFor="event-name">
              Tên sự kiện
            </label>

            <input
              id="event-name"
              type="text"
              value={eventName}
              onChange={(event) =>
                setEventName(
                  event.target.value
                )
              }
              placeholder="Nhập tên sự kiện"
              autoFocus
            />
          </div>

          <div className="event-form__field">
            <label htmlFor="event-time">
              Thời gian
            </label>

            <input
              id="event-time"
              type="text"
              value={timeLabel}
              onChange={(event) =>
                setTimeLabel(
                  event.target.value
                )
              }
              placeholder="Ví dụ: 1945 - 1954"
            />
          </div>

          <div className="event-form__field">
            <label htmlFor="event-description">
              Nội dung sự kiện
            </label>

            <textarea
              id="event-description"
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              placeholder="Nhập nội dung chi tiết của sự kiện"
              rows="14"
            />
          </div>

          <div className="event-form__field">
            <label htmlFor="event-image">
              Đường dẫn ảnh
            </label>

            <input
              id="event-image"
              type="text"
              value={imageUrl}
              onChange={(event) =>
                setImageUrl(
                  event.target.value
                )
              }
              placeholder="/uploads/events/ten-anh.jpg"
            />
          </div>

          <div className="event-form__actions">
            <button
              type="button"
              className="event-form__cancel-button"
              onClick={handleBack}
            >
              Hủy
            </button>

            <button
              type="submit"
              className="event-form__save-button"
            >
              {isEditMode
                ? "Lưu thay đổi"
                : "Thêm sự kiện"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default EventFormPage;