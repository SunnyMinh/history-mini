// import EventList from
//   "../EventList/EventList.jsx";

// import "./PeriodCard.css";

// function PeriodCard({
//   period,
//   events,
//   isExpanded,
//   onToggle,
//   onEdit,
//   onDelete,
//   onAddEvent,
//   onEditEvent,
//   onDeleteEvent,
// }) {
//   return (
//     <article
//       className={
//         isExpanded
//           ? "period-card period-card--expanded"
//           : "period-card"
//       }
//     >
//       <div className="period-card__header">
//         <button
//           type="button"
//           className="period-card__toggle"
//           aria-expanded={isExpanded}
//           onClick={() =>
//             onToggle(period.id)
//           }
//         >
//           <span className="period-card__arrow">
//             {isExpanded ? "▼" : "▶"}
//           </span>

//           <span className="period-card__information">
//             <strong className="period-card__name">
//               {period.period_name}
//             </strong>

//             <span className="period-card__time">
//               {period.time_label ||
//                 "Chưa cập nhật thời gian"}
//             </span>
//           </span>
//         </button>

//         <div className="period-card__meta">
//           <span>
//             Người tạo:{" "}
//             <strong>
//               {period.creator?.username ||
//                 "Không xác định"}
//             </strong>
//           </span>

//           <span>
//             {events.length} sự kiện
//           </span>
//         </div>

//         <div className="period-card__actions">
//           <button
//             type="button"
//             className="period-card__edit-button"
//             onClick={() =>
//               onEdit(period)
//             }
//           >
//             Sửa
//           </button>

//           <button
//             type="button"
//             className="period-card__delete-button"
//             onClick={() =>
//               onDelete(period)
//             }
//           >
//             Xóa
//           </button>
//         </div>
//       </div>

//       {isExpanded && (
//         <EventList
//           period={period}
//           events={events}
//           onAddEvent={onAddEvent}
//           onEditEvent={onEditEvent}
//           onDeleteEvent={
//             onDeleteEvent
//           }
//         />
//       )}
//     </article>
//   );
// }

// export default PeriodCard;

import EventList from
  "../EventList/EventList.jsx";

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
      className={`
        overflow-hidden
        rounded-lg
        border
        bg-white

        ${
          isExpanded
            ? "border-blue-600"
            : "border-[#d1d5db]"
        }
      `}
    >
      <div
        className="
          grid
          grid-cols-[minmax(220px,1fr)_minmax(170px,auto)_auto]
          items-center
          gap-5
          p-4

          max-[850px]:grid-cols-[minmax(0,1fr)_auto]

          max-[520px]:grid-cols-1
        "
      >
        <button
          type="button"
          className="
            group

            flex
            min-w-0
            cursor-pointer
            items-center
            gap-3

            border-0
            bg-transparent
            p-0

            text-left
            text-inherit
            [font:inherit]

            transition-[background-color,color,transform,box-shadow]
            duration-200
            ease-in-out
          "
          aria-expanded={isExpanded}
          onClick={() =>
            onToggle(period.id)
          }
        >
          <span
            className="
              w-[18px]
              shrink-0

              text-xs

              transition-[color,transform]
              duration-200
              ease-in-out

              group-hover:translate-x-0.5
              group-hover:text-blue-600
            "
          >
            {isExpanded ? "▼" : "▶"}
          </span>

          <span
            className="
              grid
              min-w-0
              gap-[5px]
            "
          >
            <strong
              className="
                overflow-hidden

                whitespace-nowrap
                text-base
                text-ellipsis

                group-hover:text-blue-600
              "
            >
              {period.period_name}
            </strong>

            <span
              className="
                text-[0.9rem]
                text-[#6b7280]
              "
            >
              {period.time_label ||
                "Chưa cập nhật thời gian"}
            </span>
          </span>
        </button>

        <div
          className="
            grid
            gap-1.5

            text-[0.85rem]
            text-[#4b5563]

            max-[850px]:col-span-full
            max-[850px]:row-start-2

            max-[520px]:col-auto
            max-[520px]:row-auto
          "
        >
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

        <div
          className="
            flex
            gap-2

            max-[520px]:justify-end
          "
        >
          <button
            type="button"
            className="
              cursor-pointer
              rounded-[5px]
              border-0
              bg-[#dbeafe]
              px-[13px]
              py-2

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
              onEdit(period)
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
              px-[13px]
              py-2

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
