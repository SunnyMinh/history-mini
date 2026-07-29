import {
  createFileRoute,
} from "@tanstack/react-router";

import AdminPage from
  "../pages/AdminPage/AdminPage";

export const Route = createFileRoute(
  "/admin"
)({
  component: AdminPage,
});