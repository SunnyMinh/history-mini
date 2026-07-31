// import { Fragment } from "react";
// import "./Text.css";

// function EventText({ events }) {
//   return (
//     <div className="text">
//       {events.map((event) => (
//         <Fragment key={event.id}>
//           <h3 id={`event-${event.id}`}>
//             {event.event_name}
//           </h3>

//           {event.time_label && (
//             <p>{event.time_label}</p>
//           )}

          
//             <img
//               src={event.image_url || "public/img/Placeholder_view.png"}
//               alt={event.event_name}
//               className="thunho"
//             />
          

//           <p>{event.description}</p>
//         </Fragment>
//       ))}
//     </div>
//   );
// }

// export default function Texts({
//   periods = [],
//   events = [],
// }) {
//   return (
//     <div className="content">
//       {periods.map((period) => {
//         const periodEvents = events.filter(
//           (event) =>
//             Number(event.period_id) === Number(period.id)
//         );

//         return (
//           <Fragment key={period.id}>
//             <h2 id={`period-${period.id}`}>
//               {period.period_name}
//             </h2>

//             {period.time_label && (
//               <p>{period.time_label}</p>
//             )}

//             <hr />

//             <EventText events={periodEvents} />
//           </Fragment>
//         );
//       })}
//     </div>
//   );
// }

import "./Text.css";

const DEFAULT_EVENT_IMAGE =
  "/img/Placeholder_view.png";

function EventText({
  events,
}) {
  if (events.length === 0) {
    return (
      <div className="period-events">
        <p className="period-events__empty">
          Thời kỳ này chưa có sự kiện.
        </p>
      </div>
    );
  }

  return (
    <div className="period-events">
      {events.map(
        (historyEvent, index) => (
          <article
            key={historyEvent.id}
            id={`event-${historyEvent.id}`}
            className="event-card"
          >
            <header className="event-card__header">
              <div>
                <p className="event-card__number">
                  Sự kiện{" "}
                  {String(index + 1).padStart(
                    2,
                    "0"
                  )}
                </p>

                <h3 className="event-card__title">
                  {historyEvent.event_name}
                </h3>
              </div>

              {historyEvent.time_label && (
                <p className="event-card__time">
                  {historyEvent.time_label}
                </p>
              )}
            </header>

            <div className="event-card__image-wrapper">
              <img
                src={
                  historyEvent.image_url ||
                  DEFAULT_EVENT_IMAGE
                }
                alt={
                  historyEvent.event_name
                }
                className="event-card__image"
                onError={(event) => {
                  if (
                    !event.currentTarget.src.endsWith(
                      DEFAULT_EVENT_IMAGE
                    )
                  ) {
                    event.currentTarget.src =
                      DEFAULT_EVENT_IMAGE;
                  }
                }}
              />
            </div>

            {historyEvent.description && (
              <p className="event-card__description">
                {historyEvent.description}
              </p>
            )}
          </article>
        )
      )}
    </div>
  );
}

export default function Texts({
  periods = [],
  events = [],
}) {
  return (
    <div className="history-periods">
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
              id={`period-${period.id}`}
              className="period-section"
            >
              <header className="period-section__header">
                <p className="period-section__number">
                  THỜI KỲ{" "}
                  {String(
                    periodIndex + 1
                  ).padStart(2, "0")}
                </p>

                <h2 className="period-section__title">
                  {period.period_name}
                </h2>

                {period.time_label && (
                  <p className="period-section__time">
                    {period.time_label}
                  </p>
                )}

                <p className="period-section__summary">
                  {periodEvents.length} sự kiện
                </p>
              </header>

              <EventText
                events={periodEvents}
              />
            </section>
          );
        }
      )}
    </div>
  );
}