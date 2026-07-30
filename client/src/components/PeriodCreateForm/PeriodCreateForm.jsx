import {
  useState,
} from "react";

import "./PeriodCreateForm.css";

function PeriodCreateForm({
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
      className="period-create-overlay"
      onClick={handleOverlayClick}
    >
      <div
        className="period-create-form"
        role="dialog"
        aria-modal="true"
        aria-labelledby="period-create-title"
      >
        <div className="period-create-form__header">
          <div>
            <p className="period-create-form__label">
              PERIOD
            </p>

            <h2 id="period-create-title">
              Thêm thời kỳ
            </h2>
          </div>

          <button
            type="button"
            className="period-create-form__close-button"
            onClick={onClose}
            aria-label="Đóng form"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="period-create-form__field">
            <label htmlFor="new-period-name">
              Tên thời kỳ
            </label>

            <input
              id="new-period-name"
              type="text"
              value={periodName}
              onChange={(event) =>
                setPeriodName(
                  event.target.value
                )
              }
              placeholder="Nhập tên thời kỳ"
              autoFocus
            />
          </div>

          <div className="period-create-form__field">
            <label htmlFor="new-period-time">
              Thời gian
            </label>

            <input
              id="new-period-time"
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
            <p className="period-create-form__error">
              {error}
            </p>
          )}

          <div className="period-create-form__actions">
            <button
              type="button"
              className="period-create-form__cancel-button"
              onClick={onClose}
            >
              Hủy
            </button>

            <button
              type="submit"
              className="period-create-form__save-button"
            >
              Thêm thời kỳ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PeriodCreateForm;