import PeriodCard from
  "../PeriodCard/PeriodCard.jsx";

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
    <section className="p-6 bg-white border border-solid border-[#e5e7eb] rounded-[10px]">
      <div className="flex items-center justify-between gap-5 mb-6">
        <div>
          <p className="mb-1 text-[#6b7280] text-[0.75rem] font-bold tracking-[1.5px]">
            PERIOD
          </p>

          <h2 className="m-0 text-[1.5rem] font-bold tracking-[-0.5px]">
            Quản lý thời kỳ
          </h2>
        </div>

        <button
          type="button"
          className="size-12 items-center justify-center leading-none text-[2rem] font-bold bg-[#2563eb] text-white border border-solid rounded-[10px] cursor-pointer hover:bg-[#1e40af] hover:-translate-y-0.5 hover:shadow-[0_5px_12px_rgba(37,99,235,0.3)]  transition-colors duration-300 ease-out active:translate-y-2 active:shadow-none"
          onClick={onAddPeriod}
        >
          +
        </button>
      </div>

      {periods.length === 0 ? (
        <p className="m-0 p-5 text-[#6b7280] text-center bg-[#f9fafb] border border-solid border-[#e5e7eb] rounded-[10px]">
          Chưa có thời kỳ nào.
        </p>
      ) : (
        <div className="grid gap-3.5">
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