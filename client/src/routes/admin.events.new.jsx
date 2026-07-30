import {
  createFileRoute,
} from "@tanstack/react-router";

import EventFormPage from
  "../pages/EventFormPage/EventFormPage";

export const Route =
  createFileRoute(
    "/admin/events/new"
  )({
    validateSearch: (search) => ({
      periodId: Number(
        search.periodId
      ),
    }),

    component: CreateEventRoute,
  });

function CreateEventRoute() {
  const { periodId } =
    Route.useSearch();

  return (
    <EventFormPage
      mode="create"
      periodId={periodId}
    />
  );
}