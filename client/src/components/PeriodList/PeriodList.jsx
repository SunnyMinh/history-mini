import PeriodCard from
  "../PeriodCard/PeriodCard.jsx";

import "./PeriodList.css";

function PeriodList({
  periods,
  events,
  expandedPeriodId,
  onTogglePeriod,
  onAddPeriod,
  onEditPeriod,
  onDeletePeriod,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
}) {
  function getEventsByPeriod(periodId) {
    return events.filter(
      (historyEvent) => {
        const eventPeriodId =
          historyEvent.period_id ??
          historyEvent.period?.id;

        return (
          String(eventPeriodId) ===
          String(periodId)
        );
      }
    );
  }

  return (
    <section className="period-list">
      <div className="period-list__heading">
        <div>
          <p className="period-list__label">
            PERIOD
          </p>

          <h2 className="period-list__title">
            Quản lý thời kỳ
          </h2>
        </div>

        <button
          type="button"
          className="period-list__add-button"
          onClick={onAddPeriod}
        >
          + Thêm thời kỳ
        </button>
      </div>

      {periods.length === 0 ? (
        <p className="period-list__empty">
          Chưa có thời kỳ nào.
        </p>
      ) : (
        <div className="period-list__items">
          {periods.map((period) => {
            const periodEvents =
              getEventsByPeriod(
                period.id
              );

            return (
              <PeriodCard
                key={period.id}
                period={period}
                events={periodEvents}
                isExpanded={
                  expandedPeriodId ===
                  period.id
                }
                onToggle={
                  onTogglePeriod
                }
                onEdit={
                  onEditPeriod
                }
                onDelete={
                  onDeletePeriod
                }
                onAddEvent={
                  onAddEvent
                }
                onEditEvent={
                  onEditEvent
                }
                onDeleteEvent={
                  onDeleteEvent
                }
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

export default PeriodList;