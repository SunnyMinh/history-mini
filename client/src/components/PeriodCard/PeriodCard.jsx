import EventList from
  "../EventList/EventList.jsx";

import "./PeriodCard.css";

function PeriodCard({
  period,
  events,
  isExpanded,
  onToggle,
  onEdit,
  onDelete,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
}) {
  return (
    <article
      className={
        isExpanded
          ? "period-card period-card--expanded"
          : "period-card"
      }
    >
      <div className="period-card__header">
        <button
          type="button"
          className="period-card__toggle"
          aria-expanded={isExpanded}
          onClick={() =>
            onToggle(period.id)
          }
        >
          <span className="period-card__arrow">
            {isExpanded ? "▼" : "▶"}
          </span>

          <span className="period-card__information">
            <strong className="period-card__name">
              {period.period_name}
            </strong>

            <span className="period-card__time">
              {period.time_label ||
                "Chưa cập nhật thời gian"}
            </span>
          </span>
        </button>

        <div className="period-card__meta">
          <span>
            Người tạo:{" "}
            <strong>
              {period.creator?.username ||
                "Không xác định"}
            </strong>
          </span>

          <span>
            {events.length} sự kiện
          </span>
        </div>

        <div className="period-card__actions">
          <button
            type="button"
            className="period-card__edit-button"
            onClick={() =>
              onEdit(period)
            }
          >
            Sửa
          </button>

          <button
            type="button"
            className="period-card__delete-button"
            onClick={() =>
              onDelete(period)
            }
          >
            Xóa
          </button>
        </div>
      </div>

      {isExpanded && (
        <EventList
          period={period}
          events={events}
          onAddEvent={onAddEvent}
          onEditEvent={onEditEvent}
          onDeleteEvent={
            onDeleteEvent
          }
        />
      )}
    </article>
  );
}

export default PeriodCard;