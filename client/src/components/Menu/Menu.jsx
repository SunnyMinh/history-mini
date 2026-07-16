import { Fragment } from "react";
import "./Menu.css";

function EventList({ events }) {
  return (
    <ul>
      {events.map((event) => (
        <li key={event.id}>
          <a href={`#event-${event.id}`}>
            {event.event_name}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Lists({
  periods = [],
  events = [],
}) {
  return (
    <div className="list">
      {periods.map((period) => {
        const periodEvents = events.filter(
          (event) =>
            Number(event.period_id) === Number(period.id)
        );

        return (
          <Fragment key={period.id}>
            <li>
              <a href={`#period-${period.id}`}>
                {period.period_name}
              </a>
            </li>

            <EventList events={periodEvents} />
          </Fragment>
        );
      })}
    </div>
  );
}