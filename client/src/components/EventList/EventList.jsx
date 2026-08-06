import EventRow from
  "../EventRow/EventRow.jsx";

function EventList({
  period,
  events,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
}) {
  return (
    <div
      className="
        border-t
        border-[#d1d5db]
        bg-[#f9fafb]
        p-5
      "
    >
      <div className="mb-4">
        <p
          className="
            mb-1
            mt-0

            text-[0.7rem]
            font-bold
            tracking-[1.5px]
            text-[#6b7280]
          "
        >
          EVENT
        </p>

        <h3
          className="
            m-0
            text-[1.05rem]
          "
        >
          Sự kiện thuộc{" "}
          {period.period_name}
        </h3>
      </div>

      {events.length === 0 ? (
        <p
          className="
            mb-4
            mt-0
            rounded-md
            border
            border-dashed
            border-[#d1d5db]
            bg-white
            p-[18px]
            text-center
            text-[#6b7280]
          "
        >
          Thời kỳ này chưa có sự kiện nào.
        </p>
      ) : (
        <div
          className="
            mb-4
            overflow-x-auto
          "
        >
          <table
            className="
              w-full
              min-w-[700px]
              border-collapse
              bg-white

              [&_th]:border-b
              [&_th]:border-[#d1d5db]
              [&_th]:bg-[#f3f4f6]
              [&_th]:p-3
              [&_th]:text-left
              [&_th]:text-[0.85rem]
              [&_th]:text-[#374151]
            "
          >
            <thead>
              <tr>
                <th>ID</th>

                <th>
                  Tên sự kiện
                </th>

                <th>
                  Thời gian
                </th>

                <th>
                  Người tạo
                </th>

                <th>
                  Hành động
                </th>
              </tr>
            </thead>

            <tbody>
              {events.map(
                (
                  historyEvent,
                  index
                ) => (
                  <EventRow
                    key={
                      historyEvent.id
                    }
                    historyEvent={
                      historyEvent
                    }
                    orderNumber={
                      index + 1
                    }
                    onEdit={
                      onEditEvent
                    }
                    onDelete={
                      onDeleteEvent
                    }
                  />
                )
              )}
            </tbody>
          </table>
        </div>
      )}

      <button
        type="button"
        className="
          cursor-pointer
          rounded-md
          border-0
          bg-blue-600
          px-4
          py-2.5

          text-white
          [font:inherit]

          transition-[background-color,transform,box-shadow]
          duration-200
          ease-[ease]

          hover:-translate-y-0.5
          hover:bg-blue-700
          hover:shadow-[0_5px_12px_rgba(37,99,235,0.3)]

          active:translate-y-0
          active:shadow-none
        "
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

