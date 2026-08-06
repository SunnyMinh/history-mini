// // import { Fragment } from "react";
// // import "./Text.css";

// // function EventText({ events }) {
// //   return (
// //     <div className="text">
// //       {events.map((event) => (
// //         <Fragment key={event.id}>
// //           <h3 id={`event-${event.id}`}>
// //             {event.event_name}
// //           </h3>

// //           {event.time_label && (
// //             <p>{event.time_label}</p>
// //           )}

          
// //             <img
// //               src={event.image_url || "public/img/Placeholder_view.png"}
// //               alt={event.event_name}
// //               className="thunho"
// //             />
          

// //           <p>{event.description}</p>
// //         </Fragment>
// //       ))}
// //     </div>
// //   );
// // }

// // export default function Texts({
// //   periods = [],
// //   events = [],
// // }) {
// //   return (
// //     <div className="content">
// //       {periods.map((period) => {
// //         const periodEvents = events.filter(
// //           (event) =>
// //             Number(event.period_id) === Number(period.id)
// //         );

// //         return (
// //           <Fragment key={period.id}>
// //             <h2 id={`period-${period.id}`}>
// //               {period.period_name}
// //             </h2>

// //             {period.time_label && (
// //               <p>{period.time_label}</p>
// //             )}

// //             <hr />

// //             <EventText events={periodEvents} />
// //           </Fragment>
// //         );
// //       })}
// //     </div>
// //   );
// // }

// import "./Text.css";

// const DEFAULT_EVENT_IMAGE =
//   "/img/Placeholder_view.png";

// function EventText({
//   events,
// }) {
//   if (events.length === 0) {
//     return (
//       <div className="period-events">
//         <p className="period-events__empty">
//           Thời kỳ này chưa có sự kiện.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="period-events">
//       {events.map(
//         (historyEvent, index) => (
//           <article
//             key={historyEvent.id}
//             id={`event-${historyEvent.id}`}
//             className="event-card"
//           >
//             <header className="event-card__header">
//               <div>
//                 <p className="event-card__number">
//                   Sự kiện{" "}
//                   {String(index + 1).padStart(
//                     2,
//                     "0"
//                   )}
//                 </p>

//                 <h3 className="event-card__title">
//                   {historyEvent.event_name}
//                 </h3>
//               </div>

//               {historyEvent.time_label && (
//                 <p className="event-card__time">
//                   {historyEvent.time_label}
//                 </p>
//               )}
//             </header>

//             <div className="event-card__image-wrapper">
//               <img
//                 src={
//                   historyEvent.image_url ||
//                   DEFAULT_EVENT_IMAGE
//                 }
//                 alt={
//                   historyEvent.event_name
//                 }
//                 className="event-card__image"
//                 onError={(event) => {
//                   if (
//                     !event.currentTarget.src.endsWith(
//                       DEFAULT_EVENT_IMAGE
//                     )
//                   ) {
//                     event.currentTarget.src =
//                       DEFAULT_EVENT_IMAGE;
//                   }
//                 }}
//               />
//             </div>

//             {historyEvent.description && (
//               <p className="event-card__description">
//                 {historyEvent.description}
//               </p>
//             )}
//           </article>
//         )
//       )}
//     </div>
//   );
// }

// export default function Texts({
//   periods = [],
//   events = [],
// }) {
//   return (
//     <div className="history-periods">
//       {periods.map(
//         (period, periodIndex) => {
//           const periodEvents =
//             events.filter(
//               (historyEvent) =>
//                 Number(
//                   historyEvent.period_id
//                 ) ===
//                 Number(period.id)
//             );

//           return (
//             <section
//               key={period.id}
//               id={`period-${period.id}`}
//               className="period-section"
//             >
//               <header className="period-section__header">
//                 <p className="period-section__number">
//                   THỜI KỲ{" "}
//                   {String(
//                     periodIndex + 1
//                   ).padStart(2, "0")}
//                 </p>

//                 <h2 className="period-section__title">
//                   {period.period_name}
//                 </h2>

//                 {period.time_label && (
//                   <p className="period-section__time">
//                     {period.time_label}
//                   </p>
//                 )}

//                 <p className="period-section__summary">
//                   {periodEvents.length} sự kiện
//                 </p>
//               </header>

//               <EventText
//                 events={periodEvents}
//               />
//             </section>
//           );
//         }
//       )}
//     </div>
//   );
// }
const DEFAULT_EVENT_IMAGE =
  "/img/Placeholder_view.png";

function EventText({
  events,
}) {
  if (events.length === 0) {
    return (
      <div
        className="
          relative
          grid
          gap-6
          bg-[#f8fafc]
          p-8

          before:absolute
          before:bottom-12
          before:left-[47px]
          before:top-12
          before:w-0.5
          before:bg-[#cbd5e1]
          before:content-['']

          max-[700px]:px-3.5
          max-[700px]:py-5

          max-[700px]:before:left-[25px]
        "
      >
        <p
          className="
            relative
            z-[1]
            m-0
            rounded-[10px]
            border
            border-dashed
            border-[#cbd5e1]
            bg-white
            p-6
            text-center
            text-[#64748b]
          "
        >
          Thời kỳ này chưa có sự kiện.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        relative
        grid
        gap-6
        bg-[#f8fafc]
        p-8

        before:absolute
        before:bottom-12
        before:left-[47px]
        before:top-12
        before:w-0.5
        before:bg-[#cbd5e1]
        before:content-['']

        max-[700px]:px-3.5
        max-[700px]:py-5

        max-[700px]:before:left-[25px]
      "
    >
      {events.map(
        (historyEvent, index) => (
          <article
            key={historyEvent.id}
            id={`event-${historyEvent.id}`}
            className="
              relative
              z-[1]
              ml-8
              scroll-mt-24
              rounded-xl

              border
              border-[#e2e8f0]
              border-l-[5px]
              border-l-[var(--period-color)]

              bg-white
              p-6

              shadow-[0_5px_16px_rgba(15,23,42,0.07)]

              transition-[transform,box-shadow]
              duration-200
              ease-in-out

              before:absolute
              before:left-[-47px]
              before:top-7
              before:h-3.5
              before:w-3.5
              before:rounded-full
              before:border-4
              before:border-[#f8fafc]
              before:bg-[var(--period-color)]
              before:shadow-[0_0_0_2px_var(--period-color)]
              before:content-['']

              hover:-translate-y-[3px]
              hover:shadow-[0_10px_24px_rgba(15,23,42,0.12)]

              max-[700px]:ml-[22px]
              max-[700px]:p-[18px]

              max-[700px]:before:left-[-33px]
            "
          >
            <header
              className="
                mb-5
                flex
                items-start
                justify-between
                gap-5

                max-[700px]:flex-col
                max-[700px]:gap-2.5
              "
            >
              <div>
                <p
                  className="
                    mb-[7px]
                    mt-0

                    text-[0.72rem]
                    font-extrabold
                    uppercase
                    tracking-[1.5px]
                    text-[var(--period-color)]
                  "
                >
                  Sự kiện{" "}
                  {String(
                    index + 1
                  ).padStart(2, "0")}
                </p>

                <h3
                  className="
                    m-0

                    text-[1.45rem]
                    leading-[1.3]
                    text-[#0f172a]
                  "
                >
                  {historyEvent.event_name}
                </h3>
              </div>

              {historyEvent.time_label && (
                <p
                  className="
                    m-0
                    shrink-0
                    rounded-full
                    bg-[#f1f5f9]
                    px-[11px]
                    py-[7px]

                    text-[0.85rem]
                    font-semibold
                    text-[#475569]

                    max-[700px]:self-start
                  "
                >
                  {historyEvent.time_label}
                </p>
              )}
            </header>

            <div
              className="
                mb-5
                overflow-hidden
                rounded-[10px]
                bg-[#e2e8f0]
              "
            >
              <img
                src={
                  historyEvent.image_url ||
                  DEFAULT_EVENT_IMAGE
                }
                alt={
                  historyEvent.event_name
                }
                className="
                  block
                  max-h-[460px]
                  w-full
                  object-contain

                  max-[700px]:max-h-[300px]
                "
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
              <p
                className="
                  m-0
                  whitespace-pre-line

                  text-base
                  leading-[1.8]
                  text-[#334155]
                "
              >
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
  const periodColors = [
    {
      main: "#1d4ed8",
      dark: "#1e3a8a",
    },
    {
      main: "#7c3aed",
      dark: "#4c1d95",
    },
    {
      main: "#b45309",
      dark: "#78350f",
    },
  ];

  return (
    <div
      className="
        grid
        gap-14
        px-8
        pb-16
        pt-8

        max-[700px]:gap-8
        max-[700px]:px-3.5
        max-[700px]:pb-10
        max-[700px]:pt-5
      "
    >
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
              id={`period-${period.id}`}
              style={{
                "--period-color":
                  color.main,
                "--period-dark":
                  color.dark,
              }}
              className="
                relative
                overflow-hidden
                scroll-mt-24
                rounded-2xl
                border
                border-[#dbe3ee]
                bg-white

                shadow-[0_12px_30px_rgba(15,23,42,0.09)]

                before:absolute
                before:left-0
                before:right-0
                before:top-0
                before:z-[2]
                before:h-1.5
                before:bg-[var(--period-color)]
                before:content-['']
              "
            >
              <header
                className="
                  relative
                  bg-[linear-gradient(135deg,var(--period-dark),var(--period-color))]
                  p-8
                  text-white

                  max-[700px]:px-5
                  max-[700px]:py-[25px]
                "
              >
                <p
                  className="
                    mb-2.5
                    mt-0

                    text-xs
                    font-extrabold
                    tracking-[2px]
                  "
                >
                  THỜI KỲ{" "}
                  {String(
                    periodIndex + 1
                  ).padStart(2, "0")}
                </p>

                <h2
                  className="
                    m-0

                    text-[clamp(1.8rem,4vw,2.8rem)]
                    leading-[1.15]
                  "
                >
                  {period.period_name}
                </h2>

                {period.time_label && (
                  <p
                    className="
                      mb-0
                      mt-3.5
                      inline-block
                      rounded-full

                      border
                      border-white/25
                      bg-white/15

                      px-3
                      py-[7px]
                      font-semibold
                    "
                  >
                    {period.time_label}
                  </p>
                )}

                <p
                  className="
                    mb-0
                    mt-[18px]

                    text-[0.9rem]
                    text-white/80
                  "
                >
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
