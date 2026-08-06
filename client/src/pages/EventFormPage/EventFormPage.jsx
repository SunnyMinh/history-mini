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

const DEFAULT_EVENT_IMAGE =
  "/img/up_load.jpg";

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

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState(DEFAULT_EVENT_IMAGE);


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

          const existingImageUrl =
            historyEvent.image_url || "";

          setImagePreview(
            existingImageUrl ||
              DEFAULT_EVENT_IMAGE
          );

          // setImageUrl( historyEvent.image_url || "");

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

  useEffect(() => {
  return () => {
    if (
      imagePreview.startsWith(
        "blob:"
      )
    ) {
      URL.revokeObjectURL(
        imagePreview
      );
    }
  };
  }, [imagePreview]);

  function handleBack() {
    navigate({
      to: "/admin",
    });
  }
  function handleImageChange(event) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (
      !allowedTypes.includes(
        file.type
      )
    ) {
      setError(
        "Chỉ chấp nhận ảnh JPG, PNG hoặc WebP"
      );

      event.target.value = "";
      return;
    }

    const maxFileSize =
      5 * 1024 * 1024;

    if (
      file.size > maxFileSize
    ) {
      setError(
        "Ảnh không được vượt quá 5 MB"
      );

      event.target.value = "";
      return;
    }

    setError("");
    setSelectedImage(file);

    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(
      previewUrl
    );
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

    if (!cleanEventName) {
      setError(
        "Vui lòng nhập tên sự kiện"
      );

      return;
    }

    try {
      const eventData =
        new FormData();

      eventData.append(
        "event_name",
        cleanEventName
      );

      eventData.append(
        "time_label",
        cleanTimeLabel
      );

      eventData.append(
        "description",
        cleanDescription
      );

      if (selectedImage) {
        eventData.append(
          "image",
          selectedImage
        );
      }

      if (isEditMode) {
        await updateEvent(
          eventId,
          eventData
        );
      } else {
        eventData.append(
          "period_id",
          currentPeriodId
        );

        await createEvent(
          eventData
        );
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
              Ảnh sự kiện
            </label>

            <input
              id="event-image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={
                handleImageChange
              }
            />

            <p className="event-form__image-note">
              Chấp nhận JPG, PNG hoặc WebP.
              Kích thước tối đa 5 MB.
            </p>

            <div className="event-form__image-preview">
              <img
                src={imagePreview}
                alt={
                  eventName.trim() ||
                  "Ảnh sự kiện"
                }
                onError={(event) => {
                  event.currentTarget.src =
                    DEFAULT_EVENT_IMAGE;
                }}
              />
            </div>

            {isEditMode &&
              !selectedImage && (
                <p className="event-form__image-status">
                  Đang sử dụng ảnh hiện tại.
                  Chọn ảnh mới để thay thế.
                </p>
              )}

            {selectedImage && (
              <p className="event-form__image-status">
                Ảnh mới:{" "}
                <strong>
                  {selectedImage.name}
                </strong>
              </p>
            )}
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