import { Fragment } from "react";
import "./Text.css";

function EventText({ events }) {
  return (
    <div className="text">
      {events.map((event) => (
        <Fragment key={event.id}>
          <h3 id={`event-${event.id}`}>
            {event.event_name}
          </h3>

          {event.time_label && (
            <p>{event.time_label}</p>
          )}

          {event.image_url && (
            <img
              src={event.image_url}
              alt={event.event_name}
              className="thunho"
            />
          )}

          <p>{event.description}</p>
        </Fragment>
      ))}
    </div>
  );
}

export default function Texts({
  periods = [],
  events = [],
}) {
  return (
    <div className="content">
      {periods.map((period) => {
        const periodEvents = events.filter(
          (event) =>
            Number(event.period_id) === Number(period.id)
        );

        return (
          <Fragment key={period.id}>
            <h2 id={`period-${period.id}`}>
              {period.period_name}
            </h2>

            {period.time_label && (
              <p>{period.time_label}</p>
            )}

            <hr />

            <EventText events={periodEvents} />
          </Fragment>
        );
      })}
    </div>
  );
}