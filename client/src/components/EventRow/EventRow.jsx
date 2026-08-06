function EventRow({
  historyEvent,
  orderNumber,
  onEdit,
  onDelete,
}) {
  return (
    <tr
      className="
        hover:bg-[#f9fafb]

        [&>td]:border-b
        [&>td]:border-[#e5e7eb]
        [&>td]:p-3

        last:[&>td]:border-b-0
      "
    >
      <td>{orderNumber}</td>

      <td>
        {historyEvent.event_name}
      </td>

      <td>
        {historyEvent.time_label ||
          "Chưa cập nhật"}
      </td>

      <td>
        {historyEvent.creator
          ?.username ||
          "Không xác định"}
      </td>

      <td>
        <div className="flex gap-2">
          <button
            type="button"
            className="
              cursor-pointer
              rounded-[5px]
              border-0
              bg-[#dbeafe]
              px-3
              py-[7px]

              text-[#1e40af]
              [font:inherit]

              transition-[background-color,color,transform,box-shadow]
              duration-200
              ease-in-out

              hover:-translate-y-0.5
              hover:bg-[#bfdbfe]
              hover:text-[#1e3a8a]
              hover:shadow-[0_4px_9px_rgba(30,64,175,0.18)]

              active:translate-y-0
              active:shadow-none
            "
            onClick={() =>
              onEdit(historyEvent)
            }
          >
            Sửa
          </button>

          <button
            type="button"
            className="
              cursor-pointer
              rounded-[5px]
              border-0
              bg-[#fee2e2]
              px-3
              py-[7px]

              text-[#991b1b]
              [font:inherit]

              transition-[background-color,color,transform,box-shadow]
              duration-200
              ease-in-out

              hover:-translate-y-0.5
              hover:bg-[#fecaca]
              hover:text-[#7f1d1d]
              hover:shadow-[0_4px_9px_rgba(153,27,27,0.18)]

              active:translate-y-0
              active:shadow-none
            "
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
