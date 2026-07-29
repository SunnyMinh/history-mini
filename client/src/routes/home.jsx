import {
  createFileRoute,
} from "@tanstack/react-router";

import HomePage from
  "../pages/HomePage/HomePage";

export const Route = createFileRoute(
  "/home"
)({
  component: HomePage,
});