import "./EventRow.css";

function EventRow({
  historyEvent,
  orderNumber,
  onEdit,
  onDelete,
}) {
  return (
    <tr className="event-row">
      <td>
        {orderNumber}
      </td>

      <td>
        {historyEvent.event_name}
      </td>

      <td>
        {historyEvent.time_label ||
          "Chưa cập nhật"}
      </td>

      <td>
        {historyEvent.creator?.username ||
          "Không xác định"}
      </td>

      <td>
        <div className="event-row__actions">
          <button
            type="button"
            className="event-row__edit-button"
            onClick={() =>
              onEdit(historyEvent)
            }
          >
            Sửa
          </button>

          <button
            type="button"
            className="event-row__delete-button"
            onClick={() =>
              onDelete(historyEvent)
            }
          >
            Xóa
          </button>
        </div>
      </td>
    </tr>
  );
}

export default EventRow;