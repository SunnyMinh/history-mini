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

import "./Menu.css";

function EventList({
  events,
}) {
  if (events.length === 0) {
    return (
      <p className="menu-period__empty">
        Chưa có sự kiện
      </p>
    );
  }

  return (
    <ul className="menu-event-list">
      {events.map(
        (historyEvent) => (
          <li
            key={historyEvent.id}
            className="menu-event-list__item"
          >
            <a
              href={`#event-${historyEvent.id}`}
              className="menu-event-list__link"
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
  return (
    <nav
      className="history-menu"
      aria-label="Mục lục lịch sử"
    >
      <div className="history-menu__heading">
        <p>MỤC LỤC</p>

        <h2>Các thời kỳ</h2>
      </div>

      <div className="history-menu__periods">
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

            return (
              <section
                key={period.id}
                className="menu-period"
              >
                <a
                  href={`#period-${period.id}`}
                  className="menu-period__link"
                >
                  <span className="menu-period__number">
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