import EventRow from
  "../EventRow/EventRow.jsx";

import "./EventList.css";

function EventList({
  period,
  events,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
}) {
  return (
    <div className="event-list">
      <div className="event-list__heading">
        <p className="event-list__label">
          EVENT
        </p>

        <h3 className="event-list__title">
          Sự kiện thuộc{" "}
          {period.period_name}
        </h3>
      </div>

      {events.length === 0 ? (
        <p className="event-list__empty">
          Thời kỳ này chưa có sự kiện nào.
        </p>
      ) : (
        <div className="event-list__table-wrapper">
          <table className="event-list__table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên sự kiện</th>
                <th>Thời gian</th>
                <th>Người tạo</th>
                <th>Hành động</th>
              </tr>
            </thead>

            <tbody>
              {events.map(
                (historyEvent, index) => (
                  <EventRow
                    key={historyEvent.id}
                    historyEvent={
                      historyEvent
                    }
                    orderNumber={index + 1}
                    onEdit={onEditEvent}
                    onDelete={onDeleteEvent}
                  />
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      <button
        type="button"
        className="event-list__add-button"
        onClick={() =>
          onAddEvent(period)
        }
      >
        + Thêm sự kiện
      </button>
    </div>
  );
}

export default EventList;