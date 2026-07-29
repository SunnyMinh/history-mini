import {
  useEffect,
  useState,
} from "react";

import "./PeriodEditForm.css";

function PeriodEditForm({
  period,
  onSave,
  onClose,
}) {
  const [
    periodName,
    setPeriodName,
  ] = useState("");

  const [
    timeLabel,
    setTimeLabel,
  ] = useState("");

  const [error, setError] =
    useState("");

  useEffect(() => {
    setPeriodName(
      period.period_name || ""
    );

    setTimeLabel(
      period.time_label || ""
    );

    setError("");
  }, [period]);

  function handleSubmit(event) {
    event.preventDefault();

    setError("");

    const cleanPeriodName =
      periodName.trim();

    const cleanTimeLabel =
      timeLabel.trim();

    if (!cleanPeriodName) {
      setError(
        "Vui lòng nhập tên thời kỳ"
      );

      return;
    }

    onSave({
      ...period,

      period_name:
        cleanPeriodName,

      time_label:
        cleanTimeLabel,
    });
  }

  function handleOverlayClick(event) {
    if (
      event.target ===
      event.currentTarget
    ) {
      onClose();
    }
  }

  return (
    <div
      className="period-edit-overlay"
      onClick={handleOverlayClick}
    >
      <div
        className="period-edit-form"
        role="dialog"
        aria-modal="true"
        aria-labelledby="period-edit-title"
      >
        <div className="period-edit-form__header">
          <div>
            <p className="period-edit-form__label">
              PERIOD
            </p>

            <h2 id="period-edit-title">
              Chỉnh sửa thời kỳ
            </h2>
          </div>

          <button
            type="button"
            className="period-edit-form__close-button"
            onClick={onClose}
            aria-label="Đóng form"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="period-edit-form__field">
            <label htmlFor="period-name">
              Tên thời kỳ
            </label>

            <input
              id="period-name"
              type="text"
              value={periodName}
              onChange={(event) =>
                setPeriodName(
                  event.target.value
                )
              }
              placeholder="Nhập tên thời kỳ"
            />
          </div>

          <div className="period-edit-form__field">
            <label htmlFor="period-time">
              Thời gian
            </label>

            <input
              id="period-time"
              type="text"
              value={timeLabel}
              onChange={(event) =>
                setTimeLabel(
                  event.target.value
                )
              }
              placeholder="Ví dụ: 1945 - 1975"
            />
          </div>

          {error && (
            <p className="period-edit-form__error">
              {error}
            </p>
          )}

          <div className="period-edit-form__actions">
            <button
              type="button"
              className="period-edit-form__cancel-button"
              onClick={onClose}
            >
              Hủy
            </button>

            <button
              type="submit"
              className="period-edit-form__save-button"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PeriodEditForm;