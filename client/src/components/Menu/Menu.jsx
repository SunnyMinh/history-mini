// import { Fragment } from "react";
// import "./Menu.css";

// function EventList({ events }) {
//   return (
//     <ul>
//       {events.map((event) => (
//         <li key={event.id}>
//           <a href={`#event-${event.id}`}>
//             {event.event_name}
//           </a>
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default function Lists({
//   periods = [],
//   events = [],
// }) {
//   return (
//     <div className="list">
//       {periods.map((period) => {
//         const periodEvents = events.filter(
//           (event) =>
//             Number(event.period_id) === Number(period.id)
//         );

//         return (
//           <Fragment key={period.id}>
//             <li>
//               <a href={`#period-${period.id}`}>
//                 {period.period_name}
//               </a>
//             </li>

//             <EventList events={periodEvents} />
//           </Fragment>
//         );
//       })}
//     </div>
//   );
// }

// import "./Menu.css";

// function EventList({
//   events,
// }) {
//   if (events.length === 0) {
//     return (
//       <p className="menu-period__empty">
//         Chưa có sự kiện
//       </p>
//     );
//   }

//   return (
//     <ul className="menu-event-list">
//       {events.map(
//         (historyEvent) => (
//           <li
//             key={historyEvent.id}
//             className="menu-event-list__item"
//           >
//             <a
//               href={`#event-${historyEvent.id}`}
//               className="menu-event-list__link"
//             >
//               {historyEvent.event_name}
//             </a>
//           </li>
//         )
//       )}
//     </ul>
//   );
// }

// export default function Lists({
//   periods = [],
//   events = [],
// }) {
//   return (
//     <nav
//       className="history-menu"
//       aria-label="Mục lục lịch sử"
//     >
//       <div className="history-menu__heading">
//         <p>MỤC LỤC</p>

//         <h2>Các thời kỳ</h2>
//       </div>

//       <div className="history-menu__periods">
//         {periods.map(
//           (period, periodIndex) => {
//             const periodEvents =
//               events.filter(
//                 (historyEvent) =>
//                   Number(
//                     historyEvent.period_id
//                   ) ===
//                   Number(period.id)
//               );

//             return (
//               <section
//                 key={period.id}
//                 className="menu-period"
//               >
//                 <a
//                   href={`#period-${period.id}`}
//                   className="menu-period__link"
//                 >
//                   <span className="menu-period__number">
//                     {String(
//                       periodIndex + 1
//                     ).padStart(2, "0")}
//                   </span>

//                   <span>
//                     {period.period_name}
//                   </span>
//                 </a>

//                 <EventList
//                   events={periodEvents}
//                 />
//               </section>
//             );
//           }
//         )}
//       </div>
//     </nav>
//   );
// }


function EventList({
  events,
}) {
  if (events.length === 0) {
    return (
      <p
        className="
          m-0
          px-3
          pb-3
          pl-7
          pt-2.5

          text-[0.8rem]
          italic
          text-[#94a3b8]
        "
      >
        Chưa có sự kiện
      </p>
    );
  }

  return (
    <ul
      className="
        m-0
        grid
        list-none
        gap-0.5
        py-2
        pl-7
        pr-2
        pb-2.5
      "
    >
      {events.map(
        (historyEvent) => (
          <li
            key={historyEvent.id}
            className="
              relative

              before:absolute
              before:left-[-12px]
              before:top-[15px]
              before:h-[5px]
              before:w-[5px]
              before:rounded-full
              before:bg-[#94a3b8]
              before:content-['']
            "
          >
            <a
              href={`#event-${historyEvent.id}`}
              className="
                block
                rounded-[5px]
                px-2
                py-[7px]

                text-[0.82rem]
                leading-[1.4]
                text-[#475569]
                no-underline

                transition-colors
                duration-200
                ease-in-out

                hover:bg-[var(--menu-light)]
                hover:text-[var(--menu-color)]
                hover:no-underline
              "
            >
              {historyEvent.event_name}
            </a>
          </li>
        )
      )}
    </ul>
  );
}

export default function Lists({
  periods = [],
  events = [],
}) {
  const periodColors = [
    {
      main: "#1d4ed8",
      light: "#eff6ff",
    },
    {
      main: "#7c3aed",
      light: "#f5f3ff",
    },
    {
      main: "#b45309",
      light: "#fffbeb",
    },
  ];

  return (
    <nav
      className="
        mb-6
        ml-6
        mr-0
        mt-6

        rounded-[14px]
        border
        border-[#dbe3ee]
        bg-white
        p-[18px]

        shadow-[0_8px_24px_rgba(15,23,42,0.08)]

        max-[900px]:mx-3.5
        max-[900px]:mb-0
        max-[900px]:mt-5
      "
      aria-label="Mục lục lịch sử"
    >
      <div
        className="
          mb-[18px]
          border-b
          border-[#e2e8f0]
          pb-3.5
        "
      >
        <p
          className="
            mb-[5px]
            mt-0

            text-[0.7rem]
            font-extrabold
            tracking-[1.7px]
            text-[#64748b]
          "
        >
          MỤC LỤC
        </p>

        <h2
          className="
            m-0
            text-[1.15rem]
            text-[#0f172a]
          "
        >
          Các thời kỳ
        </h2>
      </div>

      <div className="grid gap-3.5">
        {periods.map(
          (period, periodIndex) => {
            const periodEvents =
              events.filter(
                (historyEvent) =>
                  Number(
                    historyEvent.period_id
                  ) ===
                  Number(period.id)
              );

            const color =
              periodColors[
                periodIndex %
                  periodColors.length
              ];

            return (
              <section
                key={period.id}
                style={{
                  "--menu-color":
                    color.main,
                  "--menu-light":
                    color.light,
                }}
                className="
                  overflow-hidden
                  rounded-[9px]

                  border
                  border-[#dbe3ee]
                  border-l-4
                  border-l-[var(--menu-color)]

                  bg-white
                "
              >
                <a
                  href={`#period-${period.id}`}
                  className="
                    flex
                    items-start
                    gap-2.5
                    bg-[var(--menu-light)]
                    p-3

                    text-[0.9rem]
                    font-extrabold
                    leading-[1.35]
                    text-[#0f172a]
                    no-underline

                    transition-colors
                    duration-200
                    ease-in-out

                    hover:text-[var(--menu-color)]
                    hover:no-underline
                  "
                >
                  <span
                    className="
                      shrink-0
                      text-[0.72rem]
                      tracking-[1px]
                      text-[var(--menu-color)]
                    "
                  >
                    {String(
                      periodIndex + 1
                    ).padStart(2, "0")}
                  </span>

                  <span>
                    {period.period_name}
                  </span>
                </a>

                <EventList
                  events={periodEvents}
                />
              </section>
            );
          }
        )}
      </div>
    </nav>
  );
}

