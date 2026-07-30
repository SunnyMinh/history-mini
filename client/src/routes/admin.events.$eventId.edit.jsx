import {
  createFileRoute,
} from "@tanstack/react-router";

import EventFormPage from
  "../pages/EventFormPage/EventFormPage";

export const Route =
  createFileRoute(
    "/admin/events/$eventId/edit"
  )({
    component: EditEventRoute,
  });

function EditEventRoute() {
  const { eventId } =
    Route.useParams();

  return (
    <EventFormPage
      mode="edit"
      eventId={eventId}
    />
  );
}